import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceService} from "../../services/invoice.service";
import {InvoiceDto} from "../../models/invoice-dto";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PaymentStatus} from "../../models/payment-status";

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  dataFetched: boolean = false;
  defaultValue: object = { value: null, disabled: true };
  invoiceDetailsForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private invoiceService: InvoiceService,
              private snackBar: MatSnackBar) {
    this.invoiceDetailsForm = new FormGroup({
      invoiceNumber: new FormControl(this.defaultValue, []),
      creationDate: new FormControl(this.defaultValue, []),
      sellerName: new FormControl(this.defaultValue, []),
      sellerAddress: new FormControl(this.defaultValue, []),
      sellerTaxIdentifier: new FormControl(this.defaultValue, []),
      invoiceDescription: new FormControl(this.defaultValue, []),
      currency: new FormControl(this.defaultValue, []),
      netAmount: new FormControl(this.defaultValue, []),
      taxAmount: new FormControl(this.defaultValue, []),
      grossAmount: new FormControl(this.defaultValue, []),
      user: new FormControl(this.defaultValue, []),
      paymentStatus: new FormControl(this.defaultValue, []),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let invoiceId = params.id;
      if (invoiceId) {
        this.getInvoiceDetails(invoiceId);
      }
    });
  }

  getInvoiceDetails(invoiceId: string): void {
    this.invoiceService.getInvoice(invoiceId).subscribe((invoice: InvoiceDto) => {
        this.assignInvoiceDtoToForm(invoice);
        this.dataFetched = true;
      },
      (error: HttpErrorResponse) => {
        let errorMessage = `Wystąpił błąd podczas pobierania danych o fakturze: ${error.error}`
        console.error(errorMessage);
        this.snackBar.open(errorMessage, '', {duration: 5000});
      });
  }

  goBack(): void {
    this.router.navigate(['/app/receipts-and-payments']);
  }

  private assignInvoiceDtoToForm(invoice: InvoiceDto): void {
    console.log(invoice);
    let paymentStatus: PaymentStatus = PaymentStatus.parse(invoice.payment.paymentStatus);
    this.invoiceDetailsForm.patchValue({
      'invoiceNumber': invoice.invoiceNumber,
      'creationDate': invoice.creationDate,
      'sellerName': invoice.sellerName,
      'sellerAddress': invoice.sellerAddress,
      'sellerTaxIdentifier': invoice.sellerTaxIdentifier,
      'invoiceDescription': invoice.invoiceDescription,
      'currency': invoice.currency,
      'netAmount': invoice.netAmount,
      'taxAmount': invoice.taxAmount,
      'grossAmount': invoice.grossAmount,
      'user': invoice.user.fullName,
      'paymentStatus': paymentStatus.displayValue
    });
  }
}
