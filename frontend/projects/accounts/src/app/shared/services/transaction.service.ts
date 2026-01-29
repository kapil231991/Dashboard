import { Observable } from "rxjs";
import { HttpService } from "../../core/services/http.service";
import { Transaction } from "../models/transaction.model";
import { CreateTransactionRequest } from "../models/create-transaction.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly baseUrl = '/transactions';

  constructor(private http: HttpService) {}

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
}