import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InvoiceService} from "../../services/invoice.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-redirect-to-payment-provider',
  templateUrl: './redirect-to-payment-provider.component.html',
  styleUrls: ['./redirect-to-payment-provider.component.scss']
})
export class RedirectToPaymentProviderComponent implements OnInit {
  displayText: string = undefined;
  constructor(private dialogRef: MatDialogRef<RedirectToPaymentProviderComponent>,
              private invoiceService: InvoiceService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.displayText = 'Trwa przekierowanie na stronę płatności';
    this.getPaymentLink();
  }

  getPaymentLink(): void {
    let invoiceId = this.data.invoiceId;
    this.invoiceService.getInvoicePaymentLink(invoiceId).subscribe((link: string) => {
      console.log('Mamy link!');
      console.log(link);
      this.redirectToPaymentLink(link);
      this.dialogRef.close(null);
    }, (error: HttpErrorResponse) => {
      let errorMessage = `There was an error during fetching payment link: ${error.error}`;
      console.log(errorMessage);
      this.snackBar.open('Wystąpił problem z przekierowaniem płatności. Spróbuj ponownie później.', '', {duration: 5000});
    });
  }

  redirectToPaymentLink(paymentLink: string): void {
    window.open(paymentLink, '_blank');
  }

  setDisplayText(value: string): void {
    this.displayText = value;
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
