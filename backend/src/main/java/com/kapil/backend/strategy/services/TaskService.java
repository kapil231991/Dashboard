package com.kapil.backend.strategy.services;

import com.kapil.backend.models.User;
import com.kapil.backend.repositery.UserRepositery;
import com.kapil.backend.strategy.dto.CreateTaskRequest;
import com.kapil.backend.strategy.dto.TaskResponse;
import com.kapil.backend.strategy.dto.UpdateTaskRequest;
import com.kapil.backend.strategy.models.Goal;
import com.kapil.backend.strategy.models.GoalMilestone;
import com.kapil.backend.strategy.models.Task;
import com.kapil.backend.strategy.repositories.GoalMilestoneRepository;
import com.kapil.backend.strategy.repositories.GoalRepository;
import com.kapil.backend.strategy.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final GoalRepository goalRepository;
    private final GoalMilestoneRepository milestoneRepository;
    private final UserRepositery userRepository;

    public TaskService(TaskRepository taskRepository,
                       GoalRepository goalRepository,
                       GoalMilestoneRepository milestoneRepository,
                       UserRepositery userRepository) {
        this.taskRepository = taskRepository;
        this.goalRepository = goalRepository;
        this.milestoneRepository = milestoneRepository;
        this.userRepository = userRepository;
    }

    private User resolveUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    /* ======================
       CREATE
     ====================== */
    public TaskResponse create(CreateTaskRequest req, String username) {

        User user = resolveUser(username);

        Goal goal = null;
        GoalMilestone milestone = null;

        if (req.getGoalId() != null) {
            goal = goalRepository.findById(req.getGoalId())
                    .orElseThrow(() -> new RuntimeException("Goal not found"));

            if (goal.getCreatedBy().getUserId() != (user.getUserId()))
                throw new RuntimeException("Forbidden");
        }

        if (req.getMilestoneId() != null) {
            milestone = milestoneRepository.findById(req.getMilestoneId())
                    .orElseThrow(() -> new RuntimeException("Milestone not found"));

            if (goal.getCreatedBy().getUserId() != (user.getUserId()))
                throw new RuntimeException("Forbidden");
        }

        Task task = new Task();
        task.setGoal(goal);
        task.setMilestone(milestone);
        task.setTitle(req.getTitle());
        task.setDescription(req.getDescription());
        task.setStatus(req.getStatus());
        task.setPriority(req.getPriority());
        task.setDueDate(req.getDueDate());
        task.setEstimatedTime(req.getEstimatedTime());

        return map(taskRepository.save(task));
    }

    /* ======================
       GET BY GOAL
     ====================== */
    public List<TaskResponse> getByGoal(UUID goalId, String username) {

        User user = resolveUser(username);

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        if (goal.getCreatedBy().getUserId() != (user.getUserId()))
            throw new RuntimeException("Forbidden");

        return taskRepository.findByGoal(goal)
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    /* ======================
       GET BY MILESTONE
     ====================== */
    public List<TaskResponse> getByMilestone(UUID milestoneId, String username) {

        User user = resolveUser(username);

        GoalMilestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new RuntimeException("Milestone not found"));

        if (milestone.getGoal().getCreatedBy().getUserId() != (user.getUserId()))
            throw new RuntimeException("Forbidden");

        return taskRepository.findByMilestone(milestone)
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    /* ======================
       UPDATE
     ====================== */
    public TaskResponse update(UUID id, UpdateTaskRequest req, String username) {

        User user = resolveUser(username);

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (task.getGoal().getCreatedBy().getUserId() != (user.getUserId()))
            throw new RuntimeException("Forbidden");

        if (req.getTitle() != null) task.setTitle(req.getTitle());
        if (req.getDescription() != null) task.setDescription(req.getDescription());
        if (req.getStatus() != null) task.setStatus(req.getStatus());
        if (req.getPriority() != null) task.setPriority(req.getPriority());
        if (req.getDueDate() != null) task.setDueDate(req.getDueDate());
        if (req.getEstimatedTime() != null) task.setEstimatedTime(req.getEstimatedTime());
        if (req.getActualTime() != null) task.setActualTime(req.getActualTime());

        return map(taskRepository.save(task));
    }

    /* ======================
       DELETE
     ====================== */
    public void delete(UUID id, String username) {

        User user = resolveUser(username);

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (task.getGoal().getCreatedBy().getUserId() != (user.getUserId()))
            throw new RuntimeException("Forbidden");

        taskRepository.delete(task);
    }

    /* ======================
       MAPPER
     ====================== */
    private TaskResponse map(Task t) {

        TaskResponse r = new TaskResponse();

        r.setId(t.getId());
        if (t.getGoal() != null) r.setGoalId(t.getGoal().getId());
        if (t.getMilestone() != null) r.setMilestoneId(t.getMilestone().getId());

        r.setTitle(t.getTitle());
        r.setDescription(t.getDescription());
        r.setStatus(t.getStatus());
        r.setPriority(t.getPriority());
        r.setDueDate(t.getDueDate());
        r.setEstimatedTime(t.getEstimatedTime());
        r.setActualTime(t.getActualTime());
        r.setCreatedAt(t.getCreatedAt());
        r.setUpdatedAt(t.getUpdatedAt());

        return r;
    }
}
