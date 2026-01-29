import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { BookService } from '../../../../shared/services/book.service';
import { AuthorService } from '../../../../shared/services/author.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as AuthorSelectors from '../../../../state/author/author.selectors';
import { Author } from '../../../../shared/models/author.model';
import { Observable } from 'rxjs';
// import { DropdownModule } from 'primeng/dropdown';
// import { Book } from './book-list.component';

@Component({
  standalone: true,
  selector: 'app-book-add',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './add-component.html',
})
export class AddComponent {
  authors: any[] = [];
  authors$!: Observable<Author[]>;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router,
    private store: Store
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      isbn: ['', Validators.required],
      publisher: ['', Validators.required],
      publishedYear: ['', Validators.required],
      authorId: [null, Validators.required],
    });

    this.loadAuthors();
  }

  loadAuthors() {
    // this.authorService.getAll().subscribe(authors => {
    //   this.authors = authors;
    // });
    this.authors$ = this.store.select(AuthorSelectors.selectAllAuthors);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;

    const payload = {
      title: v.title,
      isbn: v.isbn,
      publisher: v.publisher,
      publishedYear: Number(v.publishedYear),
      author: {
        id: v.authorId,
      },
    };

    this.bookService.create(payload).subscribe(() => {
      this.router.navigate(['/book']);
    });
  }
}
