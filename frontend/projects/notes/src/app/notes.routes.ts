import { Routes } from '@angular/router';
import { NotesListComponent } from './features/notes/pages/notes-list/notes-list.component';
import { AddEditNoteComponent } from './features/notes/pages/add-edit-note/add-edit-note.component';

export const NOTES_ROUTES: Routes = [
    {
        path: '',
        component: NotesListComponent,
    },
    {
        path: 'add',
        component: AddEditNoteComponent
    },
    {
        path: 'edit/:id',
        component: AddEditNoteComponent
    }
];
