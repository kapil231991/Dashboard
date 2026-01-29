import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../../shared/services/accounts.service';
import { Account } from '../../../../shared/models/account.model';

@Component({
  standalone: true,
  selector: 'app-list-account',
  imports: [CommonModule, TableModule, RouterLink],
  templateUrl: './list-accounts.component.html',
})
export class ListAccountsComponent implements OnInit {
  accounts: Account[] = [];
  loading = false;

  constructor(private service: AccountService) {}

  ngOnInit(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (res) => {
        this.accounts = res;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
