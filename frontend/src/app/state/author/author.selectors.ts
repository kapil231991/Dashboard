import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthorState, authorFeatureKey } from './author.reducer';

// Base selector for this feature
export const selectAuthorState =
  createFeatureSelector<AuthorState>(authorFeatureKey);

// Derived selectors
export const selectAllAuthors = createSelector(
  selectAuthorState,
  state => state.list
);

export const selectAuthorLoading = createSelector(
  selectAuthorState,
  state => state.loading
);

export const selectAuthorError = createSelector(
  selectAuthorState,
  state => state.error
);

// Dashboard-style selector
export const selectAuthorCount = createSelector(
  selectAllAuthors,
  authors => authors.length
);
