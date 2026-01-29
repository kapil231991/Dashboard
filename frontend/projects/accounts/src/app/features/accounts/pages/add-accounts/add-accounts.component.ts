import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { AccountService } from "../../../../shared/services/accounts.service";

@Component({
  standalone: true,
  selector: 'app-add-account',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './add-accounts.component.html',
})
export class AddAccountsComponent {
  accountTypes = [
    { label: 'Saving', value: 'DD' },
    { label: 'Credit', value: 'CC' },
    { label: 'Overdraft', value: 'OD' },
  ];

  form: FormGroup;


  submitting = false;

  constructor(
    private fb: FormBuilder,
    private service: AccountService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      accountType: [null, Validators.required],
      openingBalance: [0, [Validators.required, Validators.min(0)]],
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.submitting = true;

    this.service.create(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/accounts']);
      },
      error: () => {
        this.submitting = false;
      },
    });
  }
}