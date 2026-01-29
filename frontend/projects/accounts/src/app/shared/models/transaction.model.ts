import { TransactionType } from "./transaction-type.model";

// transaction.model.ts
export interface Transaction {
  id: number;
  accountId: number;
  accountName: string;

  name: string;
  description: string;
  amount: number;

  transactionType: TransactionType;

  tags: string[];

  createdDate: string; // ISO string from backend
}