package com.kapil.backend.strategy.dto;

import com.kapil.backend.strategy.models.enums.MilestoneStatus;

public class UpdateGoalMilestoneRequest {

    private String title;
    private String description;
    private MilestoneStatus status;

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

    public MilestoneStatus getStatus() {
        return status;
    }

    public void setStatus(MilestoneStatus status) {
        this.status = status;
    }
}

