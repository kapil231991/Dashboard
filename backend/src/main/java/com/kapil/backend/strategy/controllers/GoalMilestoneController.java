package com.kapil.backend.strategy.controllers;

import com.kapil.backend.security.user.CustomUserDetails;
import com.kapil.backend.strategy.dto.CreateGoalMilestoneRequest;
import com.kapil.backend.strategy.dto.GoalMilestoneResponse;
import com.kapil.backend.strategy.dto.UpdateGoalMilestoneRequest;
import com.kapil.backend.strategy.services.GoalMilestoneService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/strategy")
public class GoalMilestoneController {

    private final GoalMilestoneService milestoneService;

    public GoalMilestoneController(GoalMilestoneService milestoneService) {
        this.milestoneService = milestoneService;
    }

    /* =========================
       CREATE
       ========================= */
    @PostMapping("/goals/{goalId}/milestones")
    public GoalMilestoneResponse create(
            @PathVariable UUID goalId,
            @RequestBody @Valid CreateGoalMilestoneRequest req,
            @AuthenticationPrincipal CustomUserDetails user) {

        return milestoneService.create(goalId, req, user.getUser());
    }

    /* =========================
       GET ALL FOR GOAL
       ========================= */
    @GetMapping("/goals/{goalId}/milestones")
    public List<GoalMilestoneResponse> getByGoal(
            @PathVariable UUID goalId,
            @AuthenticationPrincipal CustomUserDetails user) {

        try {
            System.out.println("➡️ ENTERED getByGoal controller");
            System.out.println("➡️ goalId = " + goalId);
            System.out.println("➡️ username = " + user.getUsername());

            return milestoneService.getByGoal(goalId, user.getUser());

        } catch (Exception e) {
            System.out.println("❌ ERROR in getByGoal controller");
            e.printStackTrace();
            throw e; // rethrow so Spring shows real error
        }
    }

    /* =========================
       GET ONE
       ========================= */
    @GetMapping("/milestones/{id}")
    public GoalMilestoneResponse getOne(
            @PathVariable UUID id,
            @AuthenticationPrincipal CustomUserDetails user) {

        return milestoneService.getOne(id, user.getUser());
    }

    /* =========================
       UPDATE
       ========================= */
    @PutMapping("/milestones/{id}")
    public GoalMilestoneResponse update(
            @PathVariable UUID id,
            @RequestBody UpdateGoalMilestoneRequest req,
            @AuthenticationPrincipal CustomUserDetails user) {

        return milestoneService.update(id, req, user.getUser());
    }

    /* =========================
       DELETE
       ========================= */
    @DeleteMapping("/milestones/{id}")
    public void delete(
            @PathVariable UUID id,
            @AuthenticationPrincipal CustomUserDetails user) {

        milestoneService.delete(id, user.getUser());
    }
}
