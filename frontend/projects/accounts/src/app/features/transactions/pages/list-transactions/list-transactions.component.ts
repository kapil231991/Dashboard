import { Component } from "@angular/core";
import { Transaction } from "../../../../shared/models/transaction.model";
import { TransactionService } from "../../../../shared/services/transaction.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TableModule } from "primeng/table";
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-transaction-list',
  imports : [CommonModule, TableModule, RouterLink, TagModule],
  templateUrl: './list-transactions.component.html',
})

export class TransactionListComponent  {
    
  transactions: Transaction[] = [];
  loading = false;

  constructor(private transactionService: TransactionService) {}

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
}