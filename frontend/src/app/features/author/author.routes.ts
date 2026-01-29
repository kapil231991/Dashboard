import { Routes } from '@angular/router';
import { AuthorHomeComponent } from './pages/author-home.component';
import { ListComponent } from './pages/list-component/list-component';
import { AddComponent } from './pages/add-component/add-component';

export const AUTHOR_ROUTES: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
];
