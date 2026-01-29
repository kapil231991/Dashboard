import { createAction, props } from '@ngrx/store';
import { Author } from '../../shared/models/author.model';

// Load all authors
export const loadAuthors = createAction(
  '[Author] Load Authors'
);

export const loadAuthorsSuccess = createAction(
  '[Author] Load Authors Success',
  props<{ authors: Author[] }>()
);

export const loadAuthorsFailure = createAction(
  '[Author] Load Authors Failure',
  props<{ error: any }>()
);

// Add author
export const addAuthor = createAction(
  '[Author] Add Author',
  props<{ author: Author }>()
);

export const addAuthorSuccess = createAction(
  '[Author] Add Author Success',
  props<{ author: Author }>()
);

export const addAuthorFailure = createAction(
  '[Author] Add Author Failure',
  props<{ error: any }>()
);
