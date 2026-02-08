import { Routes } from '@angular/router';
import { ListMilestonesComponent } from './pages/list-milestones/list-milestones.component';
import { AddEditMilestoneComponent } from './pages/add-edit-milestone/add-edit-milestone.component';

export const MILESTONES_FEATURE_ROUTES: Routes = [
    {
        path: '',
        component: ListMilestonesComponent,
    },
    {
        path: 'add',
        component: AddEditMilestoneComponent
    },
    {
        path: 'edit/:id',
        component: AddEditMilestoneComponent
    },
    {
        path: ':milestoneId/tasks',
        loadChildren: () => import('../tasks/tasks.routes')
            .then(m => m.TASKS_FEATURE_ROUTES)
    }
];
