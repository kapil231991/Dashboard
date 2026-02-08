import { TaskPriority, TaskStatus } from "./task-enums.model";

export interface Task {
    id: string;
    goalId: string;
    milestoneId?: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    estimatedTime: number; // in minutes
    createdAt?: string;
    updatedAt?: string;
}
