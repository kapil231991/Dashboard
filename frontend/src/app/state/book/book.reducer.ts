import { createReducer, on } from "@ngrx/store";
import { Book } from "../../shared/models/book.model";
import * as bookActions from "./book.action";

export const bookFeatureKey = 'books';

export interface BookState {
    list: Book[];
    loading: boolean;
    error: any;
}
export const initialState: BookState = {
    list: [],
    loading: false,
    error: null,
};

export const bookReducer = createReducer(
    initialState,

    on(/* Book Actions will go here */
        bookActions.loadBooks, state => ({
            ...state,
            loading: true,
            error: null,
        })
    ),
    on(bookActions.loadBooksSuccess, (state, { books }) => ({
        ...state,
        list: books,
        loading: false,
        error: null,
    })),
    on(bookActions.loadBooksFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
    })),
    on(bookActions.addBook, state => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(bookActions.addBookSuccess, (state, { book }) => ({
        ...state,
        list: [...state.list, book],
        loading: false,
        error: null,
    })),
    on(bookActions.addBookFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
    })),

    on(bookActions.searchBooks, state => ({
        ...state,
        loading: true
    })),

    on(bookActions.searchBooksSuccess, (state, { books }) => ({
        ...state,
        list: books,
        loading: false,
        error: null,
    })),

    on(bookActions.searchBooksFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),


)