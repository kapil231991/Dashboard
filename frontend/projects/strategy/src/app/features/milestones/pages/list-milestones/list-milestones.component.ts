import { Component, OnInit } from "@angular/core";
import { Milestone } from "../../../../shared/models/milestone.model";
import { MilestoneService } from "../../../../shared/services/milestone.service";
import { GoalService } from "../../../../shared/services/goal.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { TableModule } from "primeng/table";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";

@Component({
    selector: 'app-list-milestones',
    standalone: true,
    imports: [CommonModule, TableModule, RouterLink, ButtonModule, ConfirmDialogModule, ToastModule],
    templateUrl: './list-milestones.component.html',
})

export class ListMilestonesComponent implements OnInit {

    milestones: Milestone[] = [];
    loading = false;
    goalId = '';
    goalTitle = '';
    goalDescription = '';

    constructor(
        private milestoneService: MilestoneService,
        private goalService: GoalService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) { }

    ngOnInit(): void {
        this.goalId = this.route.snapshot.paramMap.get('goalId') || '';

        if (!this.goalId) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Goal ID is required'
            });
            this.router.navigate(['/strategy/goals']);
            return;
        }

        this.loadGoalDetails();
        this.loadMilestones();
    }

    loadGoalDetails(): void {
        this.goalService.getGoalById(this.goalId).subscribe({
            next: (goal) => {
                this.goalTitle = goal.title;
                this.goalDescription = goal.description;
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load goal details'
                });
            }
        });
    }

    loadMilestones(): void {
        this.loading = true;

        this.milestoneService.getMilestones(this.goalId).subscribe({
            next: (data) => {
                this.milestones = data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load milestones'
                });
            }
        });
    }

    onEdit(id: string): void {
        this.router.navigate(['edit', id], { relativeTo: this.route });
    }

    onViewTasks(id: string): void {
        this.router.navigate([id, 'tasks'], { relativeTo: this.route });
    }

    onDelete(id: string): void {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this milestone?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes',
            rejectLabel: 'No',

            accept: () => {
                this.milestoneService.deleteMilestone(id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Deleted',
                            detail: 'Milestone deleted successfully'
                        });

                        this.loadMilestones(); // refresh list
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to delete milestone'
                        });
                    }
                });
            }
        });
    }
}
