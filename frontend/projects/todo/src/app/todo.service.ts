import { Injectable, signal, computed, inject } from '@angular/core';
import { Todo } from './models/todo.model';
import { HttpService } from './core/services/http.service';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {

  private http = inject(HttpService);

  // 🔹 SIGNAL: source of truth
  private readonly _todos = signal<Todo[]>([]);

  // 🔹 COMPUTED: derived state
  readonly openTodos = computed(() => {
    return this._todos().filter(t => t.status !== 'DONE');
  });

  readonly doneTodos = computed(() => {
    return this._todos().filter(t => t.status === 'DONE');
  });

  constructor() {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<Todo[]>('/todos').subscribe({
      next: (todos) => this._todos.set(todos),
      error: (err) => console.error('Failed to load todos', err)
    });
  }

  getTodos() {
    return this._todos;
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>('/todos', todo).pipe(
      tap(newTodo => {
        this._todos.update(current => [...current, newTodo]);
      })
    );
  }

  updateTodo(id: number, payload: any) {
    return this.http.put<Todo>(`/todos/${id}`, payload).pipe(
      tap(updatedTodo => {
        this._todos.update(current =>
          current.map(t => t.id === id ? updatedTodo : t)
        );
      })
    );
  }

  deleteTodo(id: number) {
    return this.http.delete<void>(`/todos/${id}`).pipe(
      tap(() => {
        this._todos.update(current => current.filter(t => t.id !== id));
      })
    );
  }
}
