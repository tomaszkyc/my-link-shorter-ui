import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaymentDto} from "../models/payment-dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private API_ENDPOINT: string = '/server/api/v1/payment';

  constructor(private http: HttpClient) { }

  updatePaymentStatus(payment:PaymentDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.API_ENDPOINT}`, payment);
  }
}
