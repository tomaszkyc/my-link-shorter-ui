import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {InvoiceDto} from "../models/invoice-dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private API_ENDPOINT: string = '/server/api/v1/invoice';

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<InvoiceDto[]> {
    return this.http.get<InvoiceDto[]>(`${this.API_ENDPOINT}`);
  }

  createInvoice(invoiceDto: InvoiceDto): Observable<any> {
    return this.http.post<any>(`${this.API_ENDPOINT}/${invoiceDto.user.id}`, invoiceDto);
  }

  getInvoice(id: string): Observable<InvoiceDto> {
    return this.http.get<InvoiceDto>(`${this.API_ENDPOINT}/${id}`);
  }

  getInvoicePaymentLink(id: string): Observable<string> {
    return this.http.get<string>(`${this.API_ENDPOINT}/${id}/payment-link`);
  }
}
