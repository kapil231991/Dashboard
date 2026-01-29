import { Component } from '@angular/core';
import { Author } from '../../../../shared/models/author.model';
import { AuthorService } from '../../../../shared/services/author.service';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthorActions from '../../../../state/author/author.actions';
import * as AuthorSelectors from '../../../../state/author/author.selectors';

@Component({
  selector: 'app-list-component',
  imports: [CommonModule, TableModule, FormsModule, RouterLink],
  templateUrl: './list-component.html',
  styleUrl: './list-component.css',
})
export class ListComponent {

  deleteAuthor(id: number) {
    this.authorService.delete(id).subscribe(() => {
      // this.loadAuthors(); // refresh list
      console.log('Author deleted, refresh the list');
    });
  }

  authors$!: Observable<Author[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store, public authorService: AuthorService) {}

  ngOnInit(): void {
    this.store.dispatch(AuthorActions.loadAuthors());
    this.authors$ = this.store.select(AuthorSelectors.selectAllAuthors);
    this.loading$ = this.store.select(AuthorSelectors.selectAuthorLoading);
  }

}
