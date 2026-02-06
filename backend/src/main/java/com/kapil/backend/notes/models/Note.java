package com.kapil.backend.notes.models;
import com.kapil.backend.models.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Short title for listing & identification
     */
    @Column(nullable = false)
    private String title;

    /**
     * Main content of the note.
     * Stored as raw HTML.
     * PostgreSQL TEXT (no practical limit)
     */
    @Column(columnDefinition = "TEXT")
    private String content;

    /**
     * Ownership: each note belongs to one user
     */
    @ManyToOne(optional = false)
    private User createdBy;

    /**
     * Audit fields
     */
    @Column(nullable = false)
    private LocalDateTime createdDate = LocalDateTime.now();

    private LocalDateTime updatedDate;

    // -----------------
    // Getters & Setters
    // -----------------

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }
}