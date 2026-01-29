import { Injectable, signal, computed, effect } from '@angular/core';
import { Todo } from '../models/todo.model';
// import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {

  // 🔹 SIGNAL: source of truth
  private readonly _todos = signal<Todo[]>([]);

  constructor() {
    console.log('TodoService constructed');

    // 🔥 EFFECT
    effect(() => {
      console.log(
        'EFFECT RUN → Todos length:',
        this._todos().length
      );
    });
  }

  // 🔹 COMPUTED: derived state
  readonly openTodos = computed(() => {
    console.log('COMPUTED RUN → openTodos recalculating');
    console.log('Current Todos:', this._todos());
    return this._todos().filter(t => t.status === 'OPEN');
  });

  readonly doneTodos = computed(() => {
    console.log('COMPUTED RUN → doneTodos recalculating');
    console.log('Done Todos:', this._todos());
    return this._todos().filter(t => t.status === 'DONE');
  });

  addTodo(todo: Todo): void {
    console.log('ACTION → addTodo called');

    this._todos.update(current => {
      return [...current, todo];
    });
  }

  markDone(id: number): void {
    console.log('ACTION → markDone called');

    this._todos.update(current =>
      current.map(t =>
        t.id === id ? { ...t, status: 'DONE' } : t
      )
    );
  }

  // expose read-only
  getTodos() {
    return this._todos;
  }
}
