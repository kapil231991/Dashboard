import { createAction, props } from "@ngrx/store";
import { Book } from "../../shared/models/book.model";


// Load all books
export const loadBooks = createAction(
  '[Book] Load Books'
);

export const loadBooksSuccess = createAction(
  '[Book] Load Books Success',
  props<{ books: Book[] }>()
);

export const loadBooksFailure = createAction(
  '[Book] Load Books Failure',
  props<{ error: any }>()
);

export const addBook = createAction(
  '[Book] Add Book',
  props<{ book: Book }>()
);

export const addBookSuccess = createAction(
  '[Book] Add Book Success',
  props<{ book: Book }>()
);

export const addBookFailure = createAction(
  '[Book] Add Book Failure',
  props<{ error: any }>()
);

export const searchBooks = createAction(
  '[Book] Search',
  props<{ term: string }>()
);

export const searchBooksSuccess = createAction(
  '[Book] Search Success',
  props<{ books: Book[] }>()
);

export const searchBooksFailure = createAction(
  '[Book] Search Failure',
  props<{ error: any }>()
);