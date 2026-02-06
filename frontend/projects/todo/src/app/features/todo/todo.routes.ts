import { Routes } from '@angular/router';
import { TodoComponent } from './pages/todo-component/todo-component';
import { AddTodoComponent } from './pages/add-todo/add-todo.component';

export const TODO_ROUTES: Routes = [
  {
    path: '',
    component: TodoComponent,
  },
  {
    path: 'add',
    component: AddTodoComponent
  },
  {
    path: 'edit/:id',
    component: AddTodoComponent
  }
];
