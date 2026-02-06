package com.kapil.backend.notes.controllers;

import com.kapil.backend.notes.dto.CreateNoteRequest;
import com.kapil.backend.notes.dto.NoteResponse;
import com.kapil.backend.notes.dto.UpdateNoteRequest;
import com.kapil.backend.notes.services.NoteService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    public NoteResponse create(@RequestBody @Valid CreateNoteRequest req,
                               @AuthenticationPrincipal UserDetails principal) {
        return noteService.create(req, principal.getUsername());
    }

    @GetMapping
    public List<NoteResponse> getAll(
            @AuthenticationPrincipal UserDetails principal) {

        try {
            return noteService.getAll(principal.getUsername());
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/{id}")
    public NoteResponse getOne(@PathVariable Long id,
                               @AuthenticationPrincipal UserDetails principal) {
        return noteService.getOne(id, principal.getUsername());
    }

    @PutMapping("/{id}")
    public NoteResponse update(@PathVariable Long id,
                               @RequestBody UpdateNoteRequest req,
                               @AuthenticationPrincipal UserDetails principal) {
        return noteService.update(id, req, principal.getUsername());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id,
                       @AuthenticationPrincipal UserDetails principal) {
        noteService.delete(id, principal.getUsername());
    }
}
