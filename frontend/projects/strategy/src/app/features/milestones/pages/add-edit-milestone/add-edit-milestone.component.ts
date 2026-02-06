import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

import { MilestoneService } from "../../../../shared/services/milestone.service";
import { MONTHS, MILESTONE_STATUSES } from "../../../../shared/models/milestone-enums.model";

@Component({
    selector: 'app-add-edit-milestone',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        RouterLink,
        ToastModule
    ],
    templateUrl: './add-edit-milestone.component.html'
})

export class AddEditMilestoneComponent implements OnInit {

    isEditMode = false;
    milestoneId = '';
    goalId = '';
    title = 'Add Milestone';
    submitLabel = 'Create Milestone';
    currentYear = new Date().getFullYear();

    months = MONTHS;
    statuses = MILESTONE_STATUSES;

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private milestoneService: MilestoneService,
        private router: Router,
        private messageService: MessageService,
        private route: ActivatedRoute,
    ) {

        this.form = this.fb.group({
            year: [this.currentYear, [Validators.required, Validators.min(this.currentYear)]],
            month: ['', Validators.required],
            title: ['', Validators.required],
            description: ['', Validators.required],
            status: ['ACTIVE']
        });
    }

    ngOnInit(): void {
        this.goalId = this.route.snapshot.paramMap.get('goalId') || '';
        const id = this.route.snapshot.paramMap.get('id');

        if (!this.goalId) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Goal ID is required'
            });
            this.router.navigate(['/strategy/goals']);
            return;
        }

        if (id) {
            this.isEditMode = true;
            this.milestoneId = id;
            this.title = 'Edit Milestone';
            this.submitLabel = 'Update';

            this.loadMilestoneForEdit();
        }
    }

    loadMilestoneForEdit(): void {
        this.milestoneService.getMilestoneById(this.milestoneId).subscribe(milestone => {
            this.form.patchValue({
                year: milestone.year,
                month: milestone.month,
                title: milestone.title,
                description: milestone.description,
                status: milestone.status
            });
        });
    }

    submit(): void {
        if (this.form.invalid) return;

        const formValue = this.form.value;

        console.log(formValue);

        if (this.isEditMode) {
            this.milestoneService.updateMilestone(this.milestoneId, formValue).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Milestone Updated',
                        detail: 'Milestone updated successfully'
                    });
                    this.router.navigate(['/strategy/goals', this.goalId, 'milestones']);
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to update milestone'
                    });
                }
            });
        } else {
            // Remove status for create (it's optional)
            const createData = { ...formValue };
            delete createData.status;

            this.milestoneService.createMilestone(this.goalId, createData).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Milestone Added',
                        detail: 'Milestone created successfully'
                    });
                    this.router.navigate(['/strategy/goals', this.goalId, 'milestones']);
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to create milestone'
                    });
                }
            });
        }
    }
}
