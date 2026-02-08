package com.kapil.backend.strategy.dto;

import com.kapil.backend.strategy.models.enums.TaskStatus;

import java.time.LocalDate;

public class UpdateTaskRequest {

    private String title;
    private String description;

    private TaskStatus status;
    private Integer priority;

    private LocalDate dueDate;

    private Integer estimatedTime;
    private Integer actualTime;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public TaskStatus getStatus() { return status; }
    public void setStatus(TaskStatus status) { this.status = status; }

    public Integer getPriority() { return priority; }
    public void setPriority(Integer priority) { this.priority = priority; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public Integer getEstimatedTime() { return estimatedTime; }
    public void setEstimatedTime(Integer estimatedTime) { this.estimatedTime = estimatedTime; }

    public Integer getActualTime() { return actualTime; }
    public void setActualTime(Integer actualTime) { this.actualTime = actualTime; }
}
