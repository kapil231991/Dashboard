package com.kapil.backend.notes.services;

import com.kapil.backend.models.User;
import com.kapil.backend.notes.dto.CreateNoteRequest;
import com.kapil.backend.notes.dto.NoteResponse;
import com.kapil.backend.notes.dto.UpdateNoteRequest;
import com.kapil.backend.notes.models.Note;
import com.kapil.backend.notes.repositories.NoteRepository;
import com.kapil.backend.repositery.UserRepositery;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepositery userRepository;

    public NoteService(NoteRepository noteRepository,
                       UserRepositery userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    /* =========================
       INTERNAL: Resolve User
       ========================= */
    private User resolveUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    /* =========================
       CREATE NOTE
       ========================= */
    public NoteResponse create(CreateNoteRequest req, String username) {

        User user = resolveUser(username);

        Note note = new Note();
        note.setTitle(req.getTitle());
        note.setContent(req.getContent());
        note.setCreatedBy(user);

        Note saved = noteRepository.save(note);
        return map(saved);
    }

    /* =========================
       GET ALL NOTES (USER)
       ========================= */

    public List<NoteResponse> getAll(String username) {
        User user = resolveUser(username);
        return noteRepository.findByCreatedBy(user)
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    /* =========================
       GET ONE NOTE
       ========================= */
    public NoteResponse getOne(Long id, String username) {

        User user = resolveUser(username);

        Note note = noteRepository.findByIdAndCreatedBy(id, user)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        return map(note);
    }

    /* =========================
       UPDATE NOTE (PARTIAL)
       ========================= */
    public NoteResponse update(Long id,
                               UpdateNoteRequest req,
                               String username) {

        User user = resolveUser(username);

        Note note = noteRepository.findByIdAndCreatedBy(id, user)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        if (req.getTitle() != null) {
            note.setTitle(req.getTitle());
        }

        if (req.getContent() != null) {
            note.setContent(req.getContent());
        }

        note.setUpdatedDate(LocalDateTime.now());

        Note updated = noteRepository.save(note);
        return map(updated);
    }

    /* =========================
       DELETE NOTE (HARD DELETE)
       ========================= */
    public void delete(Long id, String username) {

        User user = resolveUser(username);

        Note note = noteRepository.findByIdAndCreatedBy(id, user)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        noteRepository.delete(note);
    }

    /* =========================
       MAPPER
       ========================= */
    private NoteResponse map(Note n) {

        NoteResponse r = new NoteResponse();
        r.setId(n.getId());
        r.setTitle(n.getTitle());
        r.setContent(n.getContent());
        r.setCreatedDate(n.getCreatedDate());
        r.setUpdatedDate(n.getUpdatedDate());

        return r;
    }
}
