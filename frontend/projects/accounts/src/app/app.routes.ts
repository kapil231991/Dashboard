import { Routes } from '@angular/router';

export const ACCOUNTS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/accounts/accounts.routes')
            .then(m => m.ACCOUNTS_FEATURE_ROUTES),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./features/transactions/transactions.routes')
            .then(m => m.TRANSACTIONS_FEATURE_ROUTES),
      },
    ],
  },
];