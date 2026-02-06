package com.kapil.backend.strategy.repositories;
import com.kapil.backend.strategy.models.Goal;
import com.kapil.backend.strategy.models.GoalMilestone;
import com.kapil.backend.strategy.models.enums.Month;
import com.kapil.backend.strategy.models.enums.Quarter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GoalMilestoneRepository
        extends JpaRepository<GoalMilestone, UUID> {

    List<GoalMilestone> findByGoal(Goal goal);

    Optional<GoalMilestone> findByGoalAndYearAndQuarter(
            Goal goal,
            Integer year,
            Quarter quarter
    );

    Optional<GoalMilestone> findByGoalAndYearAndMonth(
            Goal goal,
            Integer year,
            Month month
    );
}
