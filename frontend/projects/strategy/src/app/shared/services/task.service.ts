import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "../../core/services/http.service";
import { Task } from "../models/task.model";
import { CreateTaskRequest } from "../models/create-task.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private readonly baseUrl = '/tasks';

    constructor(private http: HttpService) { }

    getTasksByGoal(goalId: string): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.baseUrl}/goal/${goalId}`);
    }

    getTasksByMilestone(milestoneId: string): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.baseUrl}/milestone/${milestoneId}`);
    }

    getTaskById(id: string): Observable<Task> {
        return this.http.get<Task>(`${this.baseUrl}/${id}`);
    }

    createTask(data: CreateTaskRequest): Observable<Task> {
        return this.http.post<Task>(this.baseUrl, data);
    }

    updateTask(id: string, data: CreateTaskRequest): Observable<Task> {
        return this.http.put<Task>(`${this.baseUrl}/${id}`, data);
    }

    deleteTask(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
