import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {UserSettingsService} from "../user-settings/services/user-settings.service";
import {InvoiceDto} from "./models/invoice-dto";
import {InvoiceService} from "./services/invoice.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../shared/security/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateNewInvoiceDialogComponent} from "./components/create-new-invoice-dialog/create-new-invoice-dialog.component";
import {PaymentStatus} from "./models/payment-status";
import {RedirectToPaymentProviderComponent} from "./components/redirect-to-payment-provider/redirect-to-payment-provider.component";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  dataFetched: boolean = false;
  displayedColumns: string[] = ['invoiceNumber', 'creationDate', 'invoiceDescription', 'currency', 'grossAmount', 'actions'];
  dataSource = new MatTableDataSource<InvoiceDto>([]);
  customPageSize: number = 5;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private dialog: MatDialog,
              private userSettingsService: UserSettingsService,
              private invoiceService: InvoiceService,
              private snackBar: MatSnackBar,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getInvoices();
    this.getCustomPageSize();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCustomPageSize(): void {
    this.userSettingsService.getCustomPageSize().subscribe((customPageSize: number) => {
      this.customPageSize = customPageSize;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getInvoices(): void {
    this.invoiceService.getInvoices().subscribe((invoices: InvoiceDto[]) => {
        this.dataSource.data = invoices;
        this.dataFetched = true;
      },
      (error: HttpErrorResponse) => {
        let errorMessage = 'Wystąpił problem z pobraniem Twoich faktur. Spróbuj ponownie później';
        console.error(error);
        this.snackBar.open(errorMessage, '', {duration: 5000});
      });
  }

  hasAnyAuthority(authorities: string[]): boolean {
    let hasAnyAuthority = this.authService.getCurrentUser().hasAnyAuthority(authorities);
    return hasAnyAuthority;
  }

  openCreateNewInvoiceDialog() {
    let dialogRef = this.dialog.open(CreateNewInvoiceDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((invoiceDto: InvoiceDto) => {
      console.log('Dialog was closed', invoiceDto);
      if (invoiceDto) {
        this.createInvoice(invoiceDto);
      }
    });
  }

  redirectToPaymentProviderSite(invoice: InvoiceDto): void {
    console.log('Nastąpi przekierowanie na stronę płątności');
    let dialogRef = this.dialog.open(RedirectToPaymentProviderComponent, {
      width: '450px',
      data: { 'invoiceId' : invoice.id}
    });
  }

  isInvoicePaid(invoice: InvoiceDto) {
    let invoicePaymentStatus: PaymentStatus = PaymentStatus.parse(invoice.payment.paymentStatus);
    return invoicePaymentStatus.isPaid();
  }

  private createInvoice(invoiceDto: InvoiceDto): void {
    this.invoiceService.createInvoice(invoiceDto).subscribe((result) => {
        this.snackBar.open('Faktura została poprawnie stworzona', '', {duration: 5000});
        this.getInvoices();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        let errorMessage = 'Wystąpił błąd podczas tworzenia faktury. Spróbuj ponownie później lub skontaktuj się z naszym działem pomocy';
        this.snackBar.open(errorMessage, '', {duration: 5000});
      });
  }
}
