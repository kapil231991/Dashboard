import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { TodoService } from '../../../../todo.service';
import { Todo } from '../../../../models/todo.model';

@Component({
    selector: 'app-add-todo',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        InputTextModule,
        InputTextModule,
        TextareaModule,
        DatePickerModule,
        SelectModule,
        ButtonModule
    ],
    templateUrl: './add-todo.component.html'
})
export class AddTodoComponent implements OnInit {
    form: FormGroup;
    isEditMode = false;
    todoId?: number;
    title = 'Add Todo';
    submitLabel = 'Create Todo';

    statusOptions = [
        { label: 'Pending', value: 'PENDING' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Done', value: 'DONE' }
    ];

    constructor(
        private fb: FormBuilder,
        private todoService: TodoService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
        this.form = this.fb.group({
            title: ['', Validators.required],
            description: [''],
            status: ['PENDING', Validators.required],
            dueDate: [null]
        });
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.todoId = +id;
            this.title = 'Edit Todo';
            this.submitLabel = 'Update';
            this.loadTodo(this.todoId);
        }
    }

    loadTodo(id: number) {
        // Ideally we fetch from API by ID, but since we have the list in signal, we can try to find it
        // Or simpler: just use GET /api/todos/:id if service supports it.
        // Let's assume we need to implement getById in Service or find from signal.
        // The service has getAll. Let's assume we find from signal for now to save a call, 
        // OR we add getById to service. Best practice: getById from API.
        // But my service currently doesn't have getById exposed publicly except loadTodos loads all.
        // I will look into the signal.
        const todo = this.todoService.getTodos()().find(t => t.id === id);
        if (todo) {
            this.patchForm(todo);
        } else {
            // Fallback or error
            this.messageService.add({ severity: 'warn', summary: 'Not Found', detail: 'Todo not found locally' });
            this.router.navigate(['../'], { relativeTo: this.route });
        }
    }

    patchForm(todo: Todo) {
        this.form.patchValue({
            title: todo.title,
            description: todo.description,
            status: todo.status,
            dueDate: todo.dueDate ? new Date(todo.dueDate) : null
        });
    }

    submit() {
        if (this.form.invalid) return;

        const payload = this.form.value;

        if (this.isEditMode && this.todoId) {
            this.todoService.updateTodo(this.todoId, payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Todo updated' });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update' })
            });
        } else {
            this.todoService.addTodo(payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Todo created' });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create' })
            });
        }
    }
}
