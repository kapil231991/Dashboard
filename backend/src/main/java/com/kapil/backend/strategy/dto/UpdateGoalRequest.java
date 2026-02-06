package com.kapil.backend.strategy.dto;

import com.kapil.backend.strategy.models.enums.GoalCategory;
import com.kapil.backend.strategy.models.enums.GoalHorizon;
import com.kapil.backend.strategy.models.enums.GoalStatus;

import java.time.LocalDate;

public class UpdateGoalRequest {

    private String title;
    private String description;
    private GoalHorizon horizon;
    private GoalCategory category;
    private LocalDate startDate;
    private LocalDate targetDate;
    private GoalStatus status;
    private Integer priority;

    // getters & setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public GoalHorizon getHorizon() {
        return horizon;
    }

    public void setHorizon(GoalHorizon horizon) {
        this.horizon = horizon;
    }

    public GoalCategory getCategory() {
        return category;
    }

    public void setCategory(GoalCategory category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(LocalDate targetDate) {
        this.targetDate = targetDate;
    }

    public GoalStatus getStatus() {
        return status;
    }

    public void setStatus(GoalStatus status) {
        this.status = status;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }
}
