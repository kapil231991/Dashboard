package com.kapil.backend.todos.dto;


import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public class CreateTodoRequest {

    @NotBlank
    private String title;

    private String description;

    private LocalDateTime dueDate;

    // getters & setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }
}