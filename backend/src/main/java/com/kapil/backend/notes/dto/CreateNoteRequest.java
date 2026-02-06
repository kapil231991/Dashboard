package com.kapil.backend.notes.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateNoteRequest {

    @NotBlank
    private String title;

    /**
     * Raw HTML content
     */
    @NotBlank
    private String content;

    // getters & setters

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
}
