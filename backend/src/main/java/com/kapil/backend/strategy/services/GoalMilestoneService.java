package com.kapil.backend.strategy.services;

import com.kapil.backend.models.User;
import com.kapil.backend.strategy.dto.CreateGoalMilestoneRequest;
import com.kapil.backend.strategy.dto.GoalMilestoneResponse;
import com.kapil.backend.strategy.dto.UpdateGoalMilestoneRequest;
import com.kapil.backend.strategy.models.Goal;
import com.kapil.backend.strategy.models.GoalMilestone;
import com.kapil.backend.strategy.models.enums.Month;
import com.kapil.backend.strategy.models.enums.Quarter;
import com.kapil.backend.strategy.repositories.GoalMilestoneRepository;
import com.kapil.backend.strategy.repositories.GoalRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GoalMilestoneService {

    private final GoalMilestoneRepository milestoneRepository;
    private final GoalRepository goalRepository;

    public GoalMilestoneService(GoalMilestoneRepository milestoneRepository,
                                GoalRepository goalRepository) {
        this.milestoneRepository = milestoneRepository;
        this.goalRepository = goalRepository;
    }

    /* =========================
       CREATE
       ========================= */
    public GoalMilestoneResponse create(UUID goalId,
                                        CreateGoalMilestoneRequest req,
                                        User user) {

        Goal goal = loadGoal(goalId, user);

        milestoneRepository.findByGoalAndYearAndQuarter(
                goal, req.getYear(), req.getQuarter()
        ).ifPresent(m -> {
            throw new RuntimeException(
                    "Milestone already exists for this quarter"
            );
        });

        GoalMilestone milestone = new GoalMilestone();
        milestone.setGoal(goal);
        milestone.setYear(req.getYear());
        milestone.setQuarter(resolveQuarter(req.getMonth()));
        milestone.setMonth(req.getMonth());
        milestone.setTitle(req.getTitle());
        milestone.setDescription(req.getDescription());

        return map(milestoneRepository.save(milestone));
    }

    /* =========================
       GET ALL FOR GOAL
       ========================= */
    public List<GoalMilestoneResponse> getByGoal(UUID goalId, User user) {
        Goal goal = loadGoal(goalId, user);

        return milestoneRepository.findByGoal(goal)
                .stream()
                .map(this::map)
                .toList();
    }

    /* =========================
       GET ONE
       ========================= */
    public GoalMilestoneResponse getOne(UUID id, User user) {
        Goal milestoneGoal = loadMilestone(id, user).getGoal();
        return map(loadMilestone(id, user));
    }

    /* =========================
       UPDATE
       ========================= */
    public GoalMilestoneResponse update(UUID id,
                                        UpdateGoalMilestoneRequest req,
                                        User user) {

        GoalMilestone milestone = loadMilestone(id, user);

        if (req.getTitle() != null) {
            milestone.setTitle(req.getTitle());
        }
        if (req.getDescription() != null) {
            milestone.setDescription(req.getDescription());
        }
        if (req.getStatus() != null) {
            milestone.setStatus(req.getStatus());
        }

        return map(milestoneRepository.save(milestone));
    }

    /* =========================
       DELETE (HARD)
       ========================= */
    public void delete(UUID id, User user) {
        GoalMilestone milestone = loadMilestone(id, user);
        milestoneRepository.delete(milestone);
    }

    /* =========================
       HELPERS
       ========================= */
    private Goal loadGoal(UUID goalId, User user) {
        return goalRepository
                .findByIdAndCreatedBy(goalId, user)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
    }

    private GoalMilestone loadMilestone(UUID id, User user) {
        GoalMilestone milestone = milestoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Milestone not found"));

        if (!milestone.getGoal().getCreatedBy().equals(user)) {
            throw new RuntimeException("Forbidden");
        }
        return milestone;
    }

    private GoalMilestoneResponse map(GoalMilestone m) {
        GoalMilestoneResponse r = new GoalMilestoneResponse();
        r.setId(m.getId());
        r.setGoalId(m.getGoal().getId());
        r.setYear(m.getYear());
        r.setQuarter(m.getQuarter());
        r.setMonth(m.getMonth());
        r.setTitle(m.getTitle());
        r.setDescription(m.getDescription());
        r.setStatus(m.getStatus());
        r.setCreatedAt(m.getCreatedAt());
        r.setUpdatedAt(m.getUpdatedAt());
        return r;
    }

    private Quarter resolveQuarter(Month month) {
        return switch (month) {
            case JAN, FEB, MAR -> Quarter.Q1;
            case APR, MAY, JUN -> Quarter.Q2;
            case JUL, AUG, SEP -> Quarter.Q3;
            case OCT, NOV, DEC -> Quarter.Q4;
        };
    }
}
