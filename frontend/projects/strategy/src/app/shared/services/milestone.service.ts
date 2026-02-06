import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "../../core/services/http.service";
import { Milestone } from "../models/milestone.model";
import { CreateMilestoneRequest } from "../models/create-milestone.model";

@Injectable({
    providedIn: 'root'
})
export class MilestoneService {

    constructor(private http: HttpService) { }

    getMilestones(goalId: string): Observable<Milestone[]> {
        return this.http.get<Milestone[]>(`/goals/${goalId}/milestones`);
    }

    getMilestoneById(id: string): Observable<Milestone> {
        return this.http.get<Milestone>(`/milestones/${id}`);
    }

    createMilestone(goalId: string, data: CreateMilestoneRequest): Observable<Milestone> {
        return this.http.post<Milestone>(`/goals/${goalId}/milestones`, data);
    }

    updateMilestone(id: string, data: CreateMilestoneRequest): Observable<Milestone> {
        return this.http.put<Milestone>(`/milestones/${id}`, data);
    }

    deleteMilestone(id: string): Observable<void> {
        return this.http.delete<void>(`/milestones/${id}`);
    }
}
