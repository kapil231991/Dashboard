export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    ON_HOLD = 'ON_HOLD',
    CANCELLED = 'CANCELLED'
}

export enum TaskPriority {
    LOW = 0,
    MEDIUM = 1,
    HIGH = 2,
    URGENT = 3
}

export const TASK_STATUSES = [
    { label: 'Todo', value: TaskStatus.TODO },
    { label: 'In Progress', value: TaskStatus.IN_PROGRESS },
    { label: 'Completed', value: TaskStatus.COMPLETED },
    { label: 'On Hold', value: TaskStatus.ON_HOLD },
    { label: 'Cancelled', value: TaskStatus.CANCELLED }
];

export const TASK_PRIORITIES = [
    { label: 'Low', value: TaskPriority.LOW },
    { label: 'Medium', value: TaskPriority.MEDIUM },
    { label: 'High', value: TaskPriority.HIGH },
    { label: 'Urgent', value: TaskPriority.URGENT }
];
