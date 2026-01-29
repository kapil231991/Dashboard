import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../../../../shared/services/author.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-add-component',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './add-component.html',
  styleUrl: './add-component.css',
})
export class AddComponent {
  form!: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router
  ) {
    this.createForm();
  }
  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.authorService.create({
      ...this.form.value,
      books: [],
    } as any).subscribe({
      next: () => {
        this.router.navigate(['/author']);
      },
      error: () => {
        this.submitting = false;
      },
    });
  }
}
