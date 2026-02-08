import { Routes } from '@angular/router';
import { ListGoalsComponent } from './pages/list-goals/list-goals.component';
import { AddEditGoalComponent } from './pages/add-edit-goal/add-edit-goal.component';

export const GOALS_FEATURE_ROUTES: Routes = [
    {
        path: '',
        component: ListGoalsComponent,
    },
    {
        path: 'add',
        component: AddEditGoalComponent
    },
    {
        path: 'edit/:id',
        component: AddEditGoalComponent
    },
    {
        path: ':goalId/milestones',
        loadChildren: () => import('../milestones/milestones.routes')
            .then(m => m.MILESTONES_FEATURE_ROUTES)
    },
    {
        path: ':goalId/tasks',
        loadChildren: () => import('../tasks/tasks.routes')
            .then(m => m.TASKS_FEATURE_ROUTES)
    }
];
