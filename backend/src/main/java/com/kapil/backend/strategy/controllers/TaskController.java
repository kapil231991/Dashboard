package com.kapil.backend.strategy.controllers;

import com.kapil.backend.security.user.CustomUserDetails;
import com.kapil.backend.strategy.dto.CreateTaskRequest;
import com.kapil.backend.strategy.dto.TaskResponse;
import com.kapil.backend.strategy.dto.UpdateTaskRequest;
import com.kapil.backend.strategy.services.TaskService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/strategy/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /* ======================
       CREATE TASK
     ====================== */
    @PostMapping
    public TaskResponse create(@RequestBody @Valid CreateTaskRequest req,
                               @AuthenticationPrincipal CustomUserDetails user) {
        return taskService.create(req, user.getUsername());
    }

    /* ======================
       GET BY GOAL
     ====================== */
    @GetMapping("/goal/{goalId}")
    public List<TaskResponse> getByGoal(@PathVariable UUID goalId,
                                        @AuthenticationPrincipal CustomUserDetails user) {
        return taskService.getByGoal(goalId, user.getUsername());
    }

    /* ======================
       GET BY MILESTONE
     ====================== */
    @GetMapping("/milestone/{milestoneId}")
    public List<TaskResponse> getByMilestone(@PathVariable UUID milestoneId,
                                             @AuthenticationPrincipal CustomUserDetails user) {
        return taskService.getByMilestone(milestoneId, user.getUsername());
    }

    /* ======================
       UPDATE
     ====================== */
    @PutMapping("/{id}")
    public TaskResponse update(@PathVariable UUID id,
                               @RequestBody UpdateTaskRequest req,
                               @AuthenticationPrincipal CustomUserDetails user) {
        return taskService.update(id, req, user.getUsername());
    }

    /* ======================
       DELETE
     ====================== */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id,
                       @AuthenticationPrincipal CustomUserDetails user) {
        taskService.delete(id, user.getUsername());
    }
}
