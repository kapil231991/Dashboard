import { Observable } from "rxjs";
import { HttpService } from "../../core/services/http.service";
import { Transaction } from "../models/transaction.model";
import { CreateTransactionRequest } from "../models/create-transaction.model";
import { Injectable } from "@angular/core";
import { TransactionUpdate } from "../models/transaction.update.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly baseUrl = '/transactions';

  constructor(private http: HttpService) { }

  /**
   * Fetch all transactions
   * GET /api/transactions
   */
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  /**
   * Create a new transaction
   * POST /api/transactions
   */
  createTransaction(payload: CreateTransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, payload);
  }

  getTransactionById(id: number) {
    return this.http.get<TransactionUpdate>(`${this.baseUrl}/${id}`);
  }

  updateTransaction(id: number, payload: CreateTransactionRequest) {
    return this.http.put(`${this.baseUrl}/${id}`, payload);
  }

  deleteTransaction(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


}