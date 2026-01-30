import { Component } from "@angular/core";
import { Transaction } from "../../../../shared/models/transaction.model";
import { TransactionService } from "../../../../shared/services/transaction.service";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { TableModule } from "primeng/table";
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, TableModule, RouterLink, TagModule, ButtonModule],
  templateUrl: './list-transactions.component.html',
})

export class TransactionListComponent {

  transactions: Transaction[] = [];
  loading = false;

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading = true;

    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        console.log(this.transactions);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onEdit(id: number): void {
    this.router.navigate(['/accounts/transactions/edit', id]);
  }

  onDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this transaction?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',

      accept: () => {
        this.transactionService.deleteTransaction(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: 'Transaction deleted successfully'
            });

            this.loadTransactions(); // refresh list
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete transaction'
            });
          }
        });
      }
    });
  }
}