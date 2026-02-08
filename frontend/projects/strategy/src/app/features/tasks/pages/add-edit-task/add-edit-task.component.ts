import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TaskService } from '../../../../shared/services/task.service';
import { TASK_STATUSES, TASK_PRIORITIES } from '../../../../shared/models/task-enums.model';

@Component({
    selector: 'app-add-edit-task',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        InputNumberModule,
        ButtonModule,
        ToastModule
    ],
    templateUrl: './add-edit-task.component.html',
    providers: [MessageService]
})
export class AddEditTaskComponent implements OnInit {
    taskForm: FormGroup;
    isEditMode = false;
    taskId = '';
    goalId = '';
    milestoneId = '';
    statuses = TASK_STATUSES;
    priorities = TASK_PRIORITIES;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService
    ) {
        this.taskForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            status: ['TODO', Validators.required],
            priority: [1, Validators.required],
            dueDate: [null, Validators.required],
            estimatedTime: [0, [Validators.required, Validators.min(0)]]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.goalId = params.get('goalId') || '';
            this.milestoneId = params.get('milestoneId') || '';
            this.taskId = params.get('id') || '';
            this.isEditMode = !!this.taskId;

            if (this.isEditMode) {
                this.loadTask();
            }
        });

        // If milestoneId is in parent route, we can get it from parent
        if (!this.milestoneId && this.route.parent) {
            this.route.parent.paramMap.subscribe(params => {
                if (!this.milestoneId) this.milestoneId = params.get('milestoneId') || '';
            });
        }
    }

    loadTask(): void {
        this.taskService.getTaskById(this.taskId).subscribe({
            next: (task) => {
                this.taskForm.patchValue({
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    dueDate: task.dueDate.split('T')[0], // Ensure YYYY-MM-DD format
                    estimatedTime: task.estimatedTime
                });
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load task' });
            }
        });
    }

    onSubmit(): void {
        if (this.taskForm.invalid) return;

        this.loading = true;
        const taskData = {
            ...this.taskForm.value,
            goalId: this.goalId,
            milestoneId: this.milestoneId || null,
            dueDate: this.taskForm.value.dueDate // Already YYYY-MM-DD from native input
        };

        if (this.isEditMode) {
            this.taskService.updateTask(this.taskId, taskData).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated successfully' });
                    setTimeout(() => this.goBack(), 1000);
                },
                error: () => {
                    this.loading = false;
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update task' });
                }
            });
        } else {
            this.taskService.createTask(taskData).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task created successfully' });
                    setTimeout(() => this.goBack(), 1000);
                },
                error: () => {
                    this.loading = false;
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create task' });
                }
            });
        }
    }

    goBack(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }
}
