import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { Book } from '../../../../shared/models/book.model';
import { BookService } from '../../../../shared/services/book.service';
import { CommonModule } from '@angular/common';

import * as BookActions from '../../../../state/book/book.action';
import * as BookSelectors from '../../../../state/book/book.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// import { Book } from '..book.model';
@Component({
  standalone: true,
  selector: 'app-book-list',
  imports: [CommonModule, TableModule, RouterLink],
  templateUrl: './list-component.html',
})
export class ListComponent implements OnInit {

  books$!: Observable<Book[]>;
  loading$!: Observable<boolean>;

  constructor(private bookService: BookService,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.books$ = this.store.select(BookSelectors.selectAllBooks);
    console.log(this.books$);
    this.loading$ = this.store.select(BookSelectors.selectBookLoading);
    this.store.dispatch(BookActions.loadBooks());
  }

  deleteBook(bookId: number) {
    // this.store.dispatch(BookActions.deleteBook({ bookId }));
  }

  onSearch(term: string) {
    this.store.dispatch(BookActions.searchBooks({ term }));
  }


}
