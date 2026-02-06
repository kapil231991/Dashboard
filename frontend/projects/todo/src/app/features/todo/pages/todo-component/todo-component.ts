import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Todo } from '../../../../models/todo.model';
import { TodoService } from '../../../../todo.service';

@Component({
  selector: 'app-todo-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    TagModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './todo-component.html',
  styleUrl: './todo-component.css',
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  loading = false;

  constructor(
    private todoService: TodoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // Subscribe to the signal to keep local table data in sync (optional, or use async pipe)
    // Here we can just read the signal since the Service manages state
    // But Table [value] expects an array. We can pass the signal value.
    // However, the original 'getTodos()' returns a Signal<Todo[]>.
  }

  // Helper helper to access the signal value in template
  get todosList() {
    return this.todoService.getTodos()();
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Delete this todo?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.todoService.deleteTodo(id).subscribe({
          next: () => this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Todo deleted' }),
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete' })
        });
      }
    });
  }

  markDone(id: number, currentStatus: string) {
    if (currentStatus === 'DONE') return;
    this.todoService.updateTodo(id, { status: 'DONE' }).subscribe({
      next: () => this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Marked as Done' }),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update failed' })
    });
  }
}
