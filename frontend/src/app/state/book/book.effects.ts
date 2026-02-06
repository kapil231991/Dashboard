import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as bookActions from "./book.action";
import { catchError, concatMap, debounceTime, map, mergeMap, of, switchMap } from "rxjs";
import { BookService } from "../../shared/services/book.service";

@Injectable()
export class BookEffects {
    private action$ = inject(Actions);
    private bookService = inject(BookService);

    loadBooks$ = createEffect(() => (
        // start here 
        this.action$.pipe(
            ofType(bookActions.loadBooks),
            mergeMap(() => this.bookService.getAll().pipe(
                map(books => bookActions.loadBooksSuccess({ books })),
                catchError(error => of(bookActions.loadBooksFailure({ error })))
            ))
        )
    ));

    addBook$ = createEffect(() => (
        this.action$.pipe(
            ofType(bookActions.addBook),
            mergeMap(({ book }) => this.bookService.create(book).pipe(
                map(created => bookActions.addBookSuccess({ book: created })),
                catchError(error => of(bookActions.addBookFailure({ error })))
            ))
        )
    ));


    searchBooks$ = createEffect(() =>
        this.action$.pipe(
            ofType(bookActions.searchBooks),

            // 🔹 Wait for user to stop typing
            debounceTime(300),

            // 🔹 Cancel previous request on new term
            switchMap(({ term }) =>
                this.bookService.search(term).pipe(
                    map(books => bookActions.searchBooksSuccess({ books })),
                    catchError(error =>
                        of(bookActions.searchBooksFailure({ error }))
                    )
                )
            )

            
        )
    );


}
