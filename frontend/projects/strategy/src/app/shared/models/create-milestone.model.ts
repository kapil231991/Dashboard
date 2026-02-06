export interface CreateMilestoneRequest {
    year: number;
    month: string;
    title: string;
    description: string;
    status?: string;
}
