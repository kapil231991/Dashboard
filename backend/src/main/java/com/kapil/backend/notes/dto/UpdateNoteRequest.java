package com.kapil.backend.notes.dto;

public class UpdateNoteRequest {

    private String title;
    private String content;

    // getters & setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Full HTML content replacement
     */
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
