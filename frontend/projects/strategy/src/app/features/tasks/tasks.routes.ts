import { Routes } from '@angular/router';
import { ListTasksComponent } from './pages/list-tasks/list-tasks.component';
import { AddEditTaskComponent } from './pages/add-edit-task/add-edit-task.component';

export const TASKS_FEATURE_ROUTES: Routes = [
    {
        path: '',
        component: ListTasksComponent
    },
    {
        path: 'add',
        component: AddEditTaskComponent
    },
    {
        path: 'edit/:id',
        component: AddEditTaskComponent
    }
];