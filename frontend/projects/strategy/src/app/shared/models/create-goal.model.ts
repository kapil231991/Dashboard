import { GoalCategory, GoalHorizon, GoalStatus } from "./goal-enums.model";

export interface CreateGoalRequest {
    title: string;
    description: string;
    horizon: GoalHorizon;
    category: GoalCategory;
    startDate: string;
    targetDate: string;
    status: GoalStatus;
    priority: number;
    progress: number;
}
