import { createReducer, on } from '@ngrx/store';
import * as AuthorActions from './author.actions';
import { Author } from '../../shared/models/author.model';
// import { Author } from '../models/author.model';

export const authorFeatureKey = 'authors';

export interface AuthorState {
  list: Author[];
  loading: boolean;
  error: any;
}

export const initialState: AuthorState = {
  list: [],
  loading: false,
  error: null,
};

export const authorReducer = createReducer(
  initialState,

  // 🔹 Load Authors
  on(AuthorActions.loadAuthors, state => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthorActions.loadAuthorsSuccess, (state, { authors }) => ({
    ...state,
    list: authors,
    loading: false,
  })),

  on(AuthorActions.loadAuthorsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // 🔹 Add Author
  on(AuthorActions.addAuthor, state => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthorActions.addAuthorSuccess, (state, { author }) => ({
    ...state,
    list: [...state.list, author],
    loading: false,
  })),

  on(AuthorActions.addAuthorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
