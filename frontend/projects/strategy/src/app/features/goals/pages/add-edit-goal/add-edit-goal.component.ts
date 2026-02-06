import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { SliderModule } from 'primeng/slider';
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

import { GoalService } from "../../../../shared/services/goal.service";
import { GOAL_CATEGORIES, GOAL_HORIZONS, GOAL_STATUSES } from "../../../../shared/models/goal-enums.model";

@Component({
    selector: 'app-add-edit-goal',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,

        SliderModule,
        RouterLink,
        ToastModule
    ],
    templateUrl: './add-edit-goal.component.html'
})

export class AddEditGoalComponent implements OnInit {

    isEditMode = false;
    goalId = '';
    title = 'Add Goal';
    submitLabel = 'Create Goal';

    categories = GOAL_CATEGORIES;
    horizons = GOAL_HORIZONS;
    statuses = GOAL_STATUSES;

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private goalService: GoalService,
        private router: Router,
        private messageService: MessageService,
        private route: ActivatedRoute,
    ) {

        this.form = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            category: ['', Validators.required],
            horizon: ['', Validators.required],
            status: ['ACTIVE', Validators.required],
            priority: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
            progress: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
            startDate: [null, Validators.required],
            targetDate: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.goalId = id;
            this.title = 'Edit Goal';
            this.submitLabel = 'Update';

            this.loadGoalForEdit();
        }
    }

    loadGoalForEdit(): void {
        this.goalService.getGoalById(this.goalId).subscribe(goal => {
            this.form.patchValue({
                title: goal.title,
                description: goal.description,
                category: goal.category,
                horizon: goal.horizon,
                status: goal.status,
                priority: goal.priority,
                progress: goal.progress,
                startDate: goal.startDate, // Already in YYYY-MM-DD format
                targetDate: goal.targetDate // Already in YYYY-MM-DD format
            });
        });
    }

    submit(): void {
        if (this.form.invalid) return;

        const formValue = this.form.value; // Dates are already in YYYY-MM-DD format from native inputs

        console.log(formValue);

        if (this.isEditMode) {
            this.goalService.updateGoal(this.goalId, formValue).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Goal Updated',
                        detail: 'Goal updated successfully'
                    });
                    this.router.navigate(['/strategy/goals']);
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to update goal'
                    });
                }
            });
        } else {
            this.goalService.createGoal(formValue).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Goal Added',
                        detail: 'Goal created successfully'
                    });
                    this.router.navigate(['/strategy/goals']);
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to create goal'
                    });
                }
            });
        }
    }
}
