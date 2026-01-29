import { Routes } from '@angular/router';
import { BookHomeComponent } from './pages/book-home.component';
import { ListComponent } from './pages/list-component/list-component';
import { AddComponent } from './pages/add-component/add-component';

export const BOOK_ROUTES: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
];
