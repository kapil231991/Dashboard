import { Component, OnInit } from "@angular/core";
import { Goal } from "../../../../shared/models/goal.model";
import { GoalService } from "../../../../shared/services/goal.service";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { TableModule } from "primeng/table";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ProgressBarModule } from "primeng/progressbar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";

@Component({
    selector: 'app-list-goals',
    imports: [CommonModule, TableModule, RouterLink, ButtonModule, ProgressBarModule, ConfirmDialogModule, ToastModule, TooltipModule],
    templateUrl: './list-goals.component.html',
})

export class ListGoalsComponent implements OnInit {

    goals: Goal[] = [];
    loading = false;

    constructor(
        private goalService: GoalService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) { }

    ngOnInit(): void {
        this.loadGoals();
    }

    loadGoals(): void {
        this.loading = true;

        this.goalService.getGoals().subscribe({
            next: (data) => {
                this.goals = data;
                console.log(this.goals);
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load goals'
                });
            }
        });
    }

    onEdit(id: string): void {
        this.router.navigate(['/strategy/goals/edit', id]);
    }

    onViewMilestones(goalId: string): void {
        this.router.navigate(['/strategy/goals', goalId, 'milestones']);
    }

    onViewTasks(goalId: string): void {
        this.router.navigate(['/strategy/goals', goalId, 'tasks']);
    }

    onDelete(id: string): void {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this goal?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes',
            rejectLabel: 'No',

            accept: () => {
                this.goalService.deleteGoal(id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Deleted',
                            detail: 'Goal deleted successfully'
                        });

                        this.loadGoals(); // refresh list
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to delete goal'
                        });
                    }
                });
            }
        });
    }
}
