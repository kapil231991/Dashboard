package com.kapil.backend.strategy.controllers;

import com.kapil.backend.security.user.CustomUserDetails;
import com.kapil.backend.strategy.dto.CreateGoalRequest;
import com.kapil.backend.strategy.dto.GoalResponse;
import com.kapil.backend.strategy.dto.UpdateGoalRequest;
import com.kapil.backend.strategy.services.GoalService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/strategy/goals")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    /* =========================
       CREATE GOAL
       ========================= */
    @PostMapping
    public GoalResponse create(@RequestBody @Valid CreateGoalRequest req,
                               @AuthenticationPrincipal CustomUserDetails user) {
        return goalService.create(req, user.getUsername());
    }

    /* =========================
       GET ALL GOALS
       ========================= */
    @GetMapping
    public List<GoalResponse> getAll(
            @AuthenticationPrincipal CustomUserDetails user) {
        return goalService.getAll(user.getUsername());
    }

    /* =========================
       GET ONE GOAL
       ========================= */
    @GetMapping("/{id}")
    public GoalResponse getOne(@PathVariable UUID id,
                               @AuthenticationPrincipal CustomUserDetails user) {
        return goalService.getOne(id, user.getUsername());
    }

    /* =========================
       UPDATE GOAL
       ========================= */
    @PutMapping("/{id}")
    public GoalResponse update(@PathVariable UUID id,
                               @RequestBody @Valid UpdateGoalRequest req,
                               @AuthenticationPrincipal CustomUserDetails user) {
        return goalService.update(id, req, user.getUsername());
    }

    /* =========================
       DELETE GOAL (HARD DELETE)
       ========================= */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id,
                       @AuthenticationPrincipal CustomUserDetails user) {
        goalService.delete(id, user.getUsername());
    }
}