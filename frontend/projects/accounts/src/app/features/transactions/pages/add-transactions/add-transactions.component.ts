import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";


import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagService } from "../../../../shared/services/tags.service";
import { AccountService } from "../../../../shared/services/accounts.service";
import { TransactionService } from "../../../../shared/services/transaction.service";
import { TransactionType } from "../../../../shared/models/transaction-type.model";
import { Account } from "../../../../shared/models/account.model";
import { Tag } from "../../../../shared/models/tags.model";
import { MessageService } from "primeng/api";


@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    RouterLink
  ],
  templateUrl: './add-transactions.component.html'
})


export class TransactionAddComponent {


  accounts: Account[] = [];
  tags: Tag[] = [];
  isEditMode = false;
  transactionId = 0;
  title = 'Add Transaction';
  submitLabel = 'Create Transaction';

  transactionTypes = [
    { label: 'Debit', value: TransactionType.DR },
    { label: 'Credit', value: TransactionType.CR }
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private tagService: TagService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {

    this.form = this.fb.group({
      accountId: [null, Validators.required],
      amount: [null, Validators.required],
      transactionType: [TransactionType.DR, Validators.required],
      name: ['', Validators.required],
      description: [''],
      tagIds: [[] as number[]]
    });
  }

  ngOnInit(): void {
    this.loadAccounts();
    this.loadTags();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
    this.isEditMode = true;
    this.transactionId = +id;
    this.title = 'Edit Transaction';
    this.submitLabel = 'Update';

    this.loadTransactionForEdit();
    }

  }

  loadAccounts(): void {
    this.accountService.getAll().subscribe(data => {
      this.accounts = data;
    });
  }

  loadTags(): void {
    this.tagService.getTags().subscribe(data => {
      this.tags = data;
    });
  }

    loadTransactionForEdit(): void {
    this.transactionService.getTransactionById(this.transactionId).subscribe(tx => {

      const tagIds = this.tags
      .filter(tag => tx.tags.includes(tag.tagName))
      .map(tag => tag.id);

      this.form.patchValue({
        accountId: tx.accountId,
        amount: tx.amount,
        transactionType: tx.transactionType,
        name: tx.name,
        description: tx.description,
        tagIds: tagIds
      });
    });
    }

  submit(): void {
    if (this.form.invalid) return;

    console.log(this.form.value);
    if (this.isEditMode) {
      this.transactionService.updateTransaction(this.transactionId, this.form.value).subscribe({
        next: () => {
          this.isEditMode = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Transaction Updated',
            detail: 'Transaction updated successfully'
          });
          this.router.navigate(['/accounts/transactions']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update transaction'
          });
        }
      });
    } else {
      this.transactionService.createTransaction(this.form.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Transaction Added',
            detail: 'Transaction created successfully'
          });
          this.router.navigate(['/accounts/transactions']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create transaction'
          });
        }
      });
    }
  }

  


}