package com.kapil.backend.strategy.services;
import com.kapil.backend.models.User;
import com.kapil.backend.repositery.UserRepositery;
import com.kapil.backend.strategy.dto.CreateGoalRequest;
import com.kapil.backend.strategy.dto.GoalResponse;
import com.kapil.backend.strategy.dto.UpdateGoalRequest;
import com.kapil.backend.strategy.models.Goal;
import com.kapil.backend.strategy.models.enums.GoalStatus;
import com.kapil.backend.strategy.repositories.GoalRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepositery userRepository;

    public GoalService(GoalRepository goalRepository,
                       UserRepositery userRepository) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    /* =========================
       Helpers
       ========================= */

    private User resolveUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private int calculateProgress(Goal goal) {
        // Placeholder logic (will evolve later)
        if (goal.getStatus() == GoalStatus.COMPLETED) {
            return 100;
        }
        return 0;
    }

    private GoalResponse map(Goal goal) {
        GoalResponse r = new GoalResponse();
        r.setId(goal.getId());
        r.setTitle(goal.getTitle());
        r.setDescription(goal.getDescription());
        r.setHorizon(goal.getHorizon());
        r.setCategory(goal.getCategory());
        r.setStartDate(goal.getStartDate());
        r.setTargetDate(goal.getTargetDate());
        r.setStatus(goal.getStatus());
        r.setPriority(goal.getPriority());
        r.setCreatedAt(goal.getCreatedAt());
        r.setUpdatedAt(goal.getUpdatedAt());

        // Derived field
        r.setProgress(calculateProgress(goal));

        return r;
    }

    /* =========================
       CRUD operations
       ========================= */

    public GoalResponse create(CreateGoalRequest req, String username) {
        User user = resolveUser(username);

        Goal goal = new Goal();
        goal.setTitle(req.getTitle());
        goal.setDescription(req.getDescription());
        goal.setHorizon(req.getHorizon());
        goal.setCategory(req.getCategory());
        goal.setStartDate(req.getStartDate());
        goal.setTargetDate(req.getTargetDate());
        goal.setPriority(req.getPriority());
        goal.setCreatedBy(user);
        goal.setStatus(GoalStatus.ACTIVE);

        Goal saved = goalRepository.save(goal);
        return map(saved);
    }

    public List<GoalResponse> getAll(String username) {
        User user = resolveUser(username);

        return goalRepository.findByCreatedBy(user)
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    public GoalResponse getOne(UUID id, String username) {
        User user = resolveUser(username);

        Goal goal = goalRepository.findByIdAndCreatedBy(id, user)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        return map(goal);
    }

    public GoalResponse update(UUID id, UpdateGoalRequest req, String username) {
        User user = resolveUser(username);

        Goal goal = goalRepository.findByIdAndCreatedBy(id, user)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        if (req.getTitle() != null) goal.setTitle(req.getTitle());
        if (req.getDescription() != null) goal.setDescription(req.getDescription());
        if (req.getHorizon() != null) goal.setHorizon(req.getHorizon());
        if (req.getCategory() != null) goal.setCategory(req.getCategory());
        if (req.getStartDate() != null) goal.setStartDate(req.getStartDate());
        if (req.getTargetDate() != null) goal.setTargetDate(req.getTargetDate());
        if (req.getPriority() != null) goal.setPriority(req.getPriority());
        if (req.getStatus() != null) goal.setStatus(req.getStatus());

        return map(goalRepository.save(goal));
    }

    public void delete(UUID id, String username) {
        User user = resolveUser(username);

        Goal goal = goalRepository.findByIdAndCreatedBy(id, user)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        goalRepository.delete(goal); // hard delete (as decided)
    }
}
