import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactFormDto} from "../models/contact-form-dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  private API_ENDPOINT: string = '/server/api/v1/contact-us';
  constructor(private http: HttpClient) { }

  sendContactFormDto(contactFormDto: ContactFormDto): Observable<string> {
    return this.http.post<string>(`${this.API_ENDPOINT}`, contactFormDto);
  }
}
