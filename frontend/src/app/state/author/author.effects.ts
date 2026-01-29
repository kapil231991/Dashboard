import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthorActions from './author.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthorService } from '../../shared/services/author.service';

@Injectable()
export class AuthorEffects {
  private actions$ = inject(Actions);
  private authorService = inject(AuthorService);

  loadAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorActions.loadAuthors),
      mergeMap(() =>
        this.authorService.getAll().pipe(
          map(authors =>
            AuthorActions.loadAuthorsSuccess({ authors })
          ),
          catchError(error =>
            of(AuthorActions.loadAuthorsFailure({ error }))
          )
        )
      )
    )
  );

  addAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorActions.addAuthor),
      mergeMap(({ author }) =>
        this.authorService.create(author).pipe(
          map(created =>
            AuthorActions.addAuthorSuccess({ author: created })
          ),
          catchError(error =>
            of(AuthorActions.addAuthorFailure({ error }))
          )
        )
      )
    )
  );
}
