import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaymentService} from "../../services/payment.service";
import {PaymentDto} from "../../models/payment-dto";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  cardTitle: string = 'Oczekiwanie na przetworzenie płatności';
  cardSubtitle: string = 'To potrwa tylko chwilę - weryfikujemy Twoją płatność. Nie zamykaj tej strony.';
  dataFetched: boolean = false;
  paymentSuccess: boolean = false;
  constructor(private route: ActivatedRoute,
              private paymentService: PaymentService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.paymentSuccess = data.success;
    });
    this.route.params.subscribe(params => {
      let paymentId = params.id;
      let paymentDto = this.buildPaymentObject(paymentId);
      this.updatePaymentStatus(paymentDto);
    });


  }

  buildPaymentObject(paymentId: string): PaymentDto {
    let paymentDto = new PaymentDto();
    paymentDto.id = paymentId;
    paymentDto.paymentStatus = this.paymentSuccess ? 'PAID' : 'CANCEL';
    return paymentDto;
  }

  updatePaymentStatus(payment: PaymentDto): void {
    this.paymentService.updatePaymentStatus(payment).subscribe((result: boolean) => {
      this.dataFetched = true;
      this.showInfoToUser();
    },
      (error: HttpErrorResponse) => {
      let errorMessage = 'Wystąpił problem podczas przetwarzania płatności. Skontaktuj się z naszym supportem';
      console.error(errorMessage);
      console.error(error);
      this.snackBar.open(errorMessage, '', {duration: 5000});
      })
  }

  showInfoToUser(): void {
    if (this.paymentSuccess) {
      this.cardTitle = 'Płatność przetworzona pomyślnie';
      this.cardSubtitle = 'Dziękujemy za opłacenie faktury';
    } else {
      this.cardTitle = 'Ups... coś poszło nie tak';
      this.cardSubtitle = 'Wystąpił problem z opłaceniem faktury. Spróbuj ponownie później lub skontaktuj się z naszym supportem';
    }
  }

}
