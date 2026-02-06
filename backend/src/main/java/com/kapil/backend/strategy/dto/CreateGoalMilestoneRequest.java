package com.kapil.backend.strategy.dto;
import com.kapil.backend.strategy.models.enums.Month;
import com.kapil.backend.strategy.models.enums.Quarter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateGoalMilestoneRequest {

    @NotNull
    private Integer year;

    private Quarter quarter;

    @NotNull
    private Month month;

    @NotBlank
    private String title;

    private String description;

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Quarter getQuarter() {
        return quarter;
    }

    public void setQuarter(Quarter quarter) {
        this.quarter = quarter;
    }

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


    public @NotNull Month getMonth() {
        return month;
    }

    public void setMonth(@NotNull Month month) {
        this.month = month;
    }
}
