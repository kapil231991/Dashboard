import { TaskPriority, TaskStatus } from "./task-enums.model";

export interface CreateTaskRequest {
    goalId: string;
    milestoneId?: string | null;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    estimatedTime: number;
}
