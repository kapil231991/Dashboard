import { createFeatureSelector, createSelector } from "@ngrx/store";
import { bookFeatureKey, BookState } from "./book.reducer";

export const selectBookState =
  createFeatureSelector<BookState>(bookFeatureKey);

export const selectAllBooks = createSelector(
    selectBookState,
    (state: BookState) => state.list
);

export const selectBookLoading = createSelector(
    selectBookState,
    (state: BookState) => state.loading
);

export const selectBookError = createSelector(
    selectBookState,
    (state: BookState) => state.error
);

export const selectBookCount = createSelector(
    selectAllBooks,
    (books) => books.length
);

export const selectBooksByAuthor = (authorId: number) => createSelector(
    selectAllBooks,
    (books) => books.filter(book => book.author?.id === authorId)
);