import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { Task } from "../../../../shared/models/task.model";
import { TaskService } from "../../../../shared/services/task.service";
import { GoalService } from "../../../../shared/services/goal.service";
import { MilestoneService } from "../../../../shared/services/milestone.service";

@Component({
    selector: 'app-list-tasks',
    standalone: true,
    imports: [CommonModule, TableModule, RouterLink, ButtonModule, ConfirmDialogModule, ToastModule],
    templateUrl: './list-tasks.component.html',
    providers: [ConfirmationService, MessageService]
})
export class ListTasksComponent implements OnInit {
    tasks: Task[] = [];
    loading = false;
    goalId = '';
    milestoneId = '';
    title = 'Tasks';
    subtitle = '';

    constructor(
        private taskService: TaskService,
        private goalService: GoalService,
        private milestoneService: MilestoneService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.goalId = params.get('goalId') || '';
            this.milestoneId = params.get('milestoneId') || '';

            if (this.milestoneId) {
                // this.loadMilestoneDetails();
                this.loadTasksByMilestone();
            } else if (this.goalId) {
                this.loadGoalDetails();
                this.loadTasksByGoal();
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Goal ID or Milestone ID is required'
                });
                this.router.navigate(['/strategy/goals']);
            }
        });
    }

    loadGoalDetails(): void {
        this.goalService.getGoalById(this.goalId).subscribe({
            next: (goal) => {
                this.title = `Tasks for Goal: ${goal.title}`;
                this.subtitle = goal.description;
            }
        });
    }

    // loadMilestoneDetails(): void {
    //     this.milestoneService.getMilestoneById(this.milestoneId).subscribe({
    //         next: (milestone) => {
    //             this.title = `Tasks for Milestone: ${milestone.title}`;
    //             this.subtitle = milestone.description;
    //         }
    //     });
    // }

    loadTasksByGoal(): void {
        this.loading = true;
        this.taskService.getTasksByGoal(this.goalId).subscribe({
            next: (data) => {
                this.tasks = data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load tasks' });
            }
        });
    }

    loadTasksByMilestone(): void {
        this.loading = true;
        this.taskService.getTasksByMilestone(this.milestoneId).subscribe({
            next: (data) => {
                this.tasks = data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load tasks' });
            }
        });
    }

    onEdit(id: string): void {
        this.router.navigate(['edit', id], { relativeTo: this.route });
    }

    onDelete(id: string): void {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this task?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.taskService.deleteTask(id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Task deleted successfully' });
                        if (this.milestoneId) this.loadTasksByMilestone();
                        else this.loadTasksByGoal();
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete task' });
                    }
                });
            }
        });
    }

    getPriorityLabel(priority: number): string {
        switch (priority) {
            case 0: return 'Low';
            case 1: return 'Medium';
            case 2: return 'High';
            case 3: return 'Urgent';
            default: return 'Normal';
        }
    }
}
