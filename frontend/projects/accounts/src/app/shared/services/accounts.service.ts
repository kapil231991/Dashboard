import { Injectable } from "@angular/core";
import { HttpService } from "../../core/services/http.service";
import { Account } from "../models/account.model";

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpService) {}

  getAll() {
    return this.http.get<Account[]>('/accounts');
  }

  create(payload: any) {
    return this.http.post<Account>('/accounts', payload);
  }
}
