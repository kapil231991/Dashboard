package com.kapil.backend.strategy.repositories;

import com.kapil.backend.strategy.models.Task;
import com.kapil.backend.strategy.models.Goal;
import com.kapil.backend.strategy.models.GoalMilestone;
import com.kapil.backend.strategy.models.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    /* =========================
       BASIC FILTERS
       ========================= */

    List<Task> findByGoal(Goal goal);

    List<Task> findByMilestone(GoalMilestone milestone);

    /* =========================
       STATUS FILTERS
       ========================= */

    List<Task> findByGoalAndStatus(Goal goal, TaskStatus status);

    List<Task> findByMilestoneAndStatus(GoalMilestone milestone, TaskStatus status);

    /* =========================
       DASHBOARD / FUTURE USE
       ========================= */

    List<Task> findByGoalOrderByPriorityAsc(Goal goal);

    List<Task> findByMilestoneOrderByDueDateAsc(GoalMilestone milestone);
}
