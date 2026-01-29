import { TransactionType } from "./transaction-type.model";

// create-transaction.request.ts
export interface CreateTransactionRequest {
  accountId: number;
  amount: number;
  transactionType: TransactionType;

  name: string;
  description: string;

  tagIds: number[];
}