package com.kapil.backend.notes.repositories;

import com.kapil.backend.models.User;
import com.kapil.backend.notes.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    /**
     * Fetch all notes for a user
     */
    List<Note> findByCreatedBy(User user);

    /**
     * Fetch single note with ownership check
     */
    Optional<Note> findByIdAndCreatedBy(Long id, User user);
}