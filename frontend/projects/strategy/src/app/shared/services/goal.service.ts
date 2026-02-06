import { Observable } from "rxjs";
import { HttpService } from "../../core/services/http.service";
import { Goal } from "../models/goal.model";
import { CreateGoalRequest } from "../models/create-goal.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GoalService {

    private readonly baseUrl = '/goals';

    constructor(private http: HttpService) { }

    /**
     * Fetch all goals
     * GET /api/strategy/goals
     */
    getGoals(): Observable<Goal[]> {
        return this.http.get<Goal[]>(this.baseUrl);
    }

    /**
     * Get goal by ID
     * GET /api/strategy/goals/{id}
     */
    getGoalById(id: string): Observable<Goal> {
        return this.http.get<Goal>(`${this.baseUrl}/${id}`);
    }

    /**
     * Create a new goal
     * POST /api/strategy/goals
     */
    createGoal(payload: CreateGoalRequest): Observable<Goal> {
        return this.http.post<Goal>(this.baseUrl, payload);
    }

    /**
     * Update existing goal
     * PUT /api/strategy/goals/{id}
     */
    updateGoal(id: string, payload: CreateGoalRequest): Observable<Goal> {
        return this.http.put<Goal>(`${this.baseUrl}/${id}`, payload);
    }

    /**
     * Delete goal
     * DELETE /api/strategy/goals/{id}
     */
    deleteGoal(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
