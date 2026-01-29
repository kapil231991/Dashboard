import { Component } from '@angular/core';
import { Todo } from '../../../../shared/models/todo.model';
import { TodoService } from '../../../../shared/services/todo.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-component.html',
  styleUrl: './todo-component.css',
})
export class TodoComponent {

  constructor(public todoService: TodoService) {}
  
    add() {
    const todo: Todo = {
      id: Date.now(),
      createdBy: 'Kapil',
      title: 'Learn Signals',
      description: 'Understand signal, computed, effect',
      createdAt: new Date(),
      status: 'OPEN',
    };

    this.todoService.addTodo(todo);
  }

  done(index: number) {
    const todos = this.todoService.getTodos()();
    if (todos.length > 0) {
      this.todoService.markDone(todos[index].id);
    }
  }
}
