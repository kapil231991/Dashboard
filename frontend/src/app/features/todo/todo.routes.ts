import { Routes } from '@angular/router';
import { TodoComponent } from './pages/todo-component/todo-component';
// import { DashboardComponent } from './pages/dashboard.component';

export const TODO_ROUTES: Routes = [
  {
    path: '',
    component: TodoComponent,
  },
];
