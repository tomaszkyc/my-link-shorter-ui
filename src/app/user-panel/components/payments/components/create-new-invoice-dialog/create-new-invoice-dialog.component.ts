import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {CurrencyDto} from "../../models/currency-dto";
import {UserDto} from "../../../users/models/user-dto";
import {UserDtoService} from "../../../users/services/user-dto.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {InvoiceDto} from "../../models/invoice-dto";

@Component({
  selector: 'app-create-new-invoice-dialog',
  templateUrl: './create-new-invoice-dialog.component.html',
  styleUrls: ['./create-new-invoice-dialog.component.scss']
})
export class CreateNewInvoiceDialogComponent implements OnInit {
  newInvoiceForm: FormGroup;
  currencies: CurrencyDto[];
  users: UserDto[];
  filteredUsers: Observable<UserDto[]>;
  constructor(private dialogRef: MatDialogRef<CreateNewInvoiceDialogComponent>,
              private datepipe: DatePipe,
              private userDtoService: UserDtoService,
              private snackBar: MatSnackBar) {
    this.newInvoiceForm = new FormGroup({
      creationDate: new FormControl(new Date(), [Validators.required]),
      invoiceDescription: new FormControl(this.getInvoiceDescriptionDefaultValue(), [Validators.required]),
      currency: new FormControl(this.getDefaultCurrency(), [Validators.required]),
      netAmount: new FormControl(0, [Validators.required]),
      taxPercentage: new FormControl(0, [Validators.required]),
      taxAmount: new FormControl({value: 0, disabled: true}, [Validators.required]),
      grossAmount: new FormControl({value: 0, disabled: true}, [Validators.required]),
      user: new FormControl(null, [Validators.required])
    });
    this.setTaxAmount();
    this.setGrossAmount();
  }

  ngOnInit(): void {
    this.currencies = CurrencyDto.generateValues();
    this.getUsers();
  }

  filterUsers(): void {
    this.filteredUsers = this.newInvoiceForm.get('user').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.fullname),
        map(name => name ? this._filter(name) : this.users.slice())
      )
  }

  getUsers(): void {
    this.userDtoService.getUsers().subscribe((users: UserDto[]) => {
      this.users = users;
      this.filterUsers();
    },
      (error: HttpErrorResponse) => {
      let errorMessage = 'Wystąpił błąd podczas pobierania listy użytkowników. Spróbuj ponownie później';
      this.snackBar.open(errorMessage, '', {duration: 5000});
      });
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    let formValid = this.newInvoiceForm.valid;
    if (formValid) {
      this.createInvoice();
    }
  }

  createInvoice(): void {
    let invoice = this.buildInvoiceFromForm();
    this.dialogRef.close(invoice);
  }

  buildInvoiceFromForm(): InvoiceDto {
    let invoice: InvoiceDto = new InvoiceDto();
    invoice.creationDate = this.newInvoiceForm.get('creationDate').value;
    invoice.invoiceDescription = this.newInvoiceForm.get('invoiceDescription').value;
    invoice.currency = this.newInvoiceForm.get('currency').value.currencyCode;
    invoice.netAmount = this.newInvoiceForm.get('netAmount').value;
    invoice.taxAmount = this.newInvoiceForm.get('taxAmount').value;
    invoice.grossAmount = this.newInvoiceForm.get('grossAmount').value;
    invoice.user = this.newInvoiceForm.get('user').value;
    return invoice;
  }

  compareCurrency(s1: CurrencyDto, s2: CurrencyDto): boolean {
    return CurrencyDto.compareCurrency(s1, s2);
  }

  private getInvoiceDescriptionDefaultValue(): string {
    let formattedCurrentDate = this.datepipe.transform(new Date(), 'yyyy-MM');
    let invoiceDescriptionDefaultValue =  `Opłata za usługę LinkShorter dla okresu rozliczeniowego ${formattedCurrentDate}`;
    return invoiceDescriptionDefaultValue;
  }

  private getDefaultCurrency(): CurrencyDto {
    return CurrencyDto.getDefaultCurrency();
  }

  onNetAmountChange(): void {
    this.setTaxAmount();
    this.setGrossAmount();
  }

  onTaxPercentageChange(): void {
    this.setTaxAmount();
    this.setGrossAmount();
  }

  setTaxAmount() {
    let taxAmount = this.countTaxAmount();
    this.newInvoiceForm.patchValue({
      'taxAmount': taxAmount
    });
  }

  setGrossAmount() {
    let grossAmount = this.countGrossAmount();
    this.newInvoiceForm.patchValue({
      'grossAmount': grossAmount
    });
  }

  displayUserAutocompleteFunction(user: UserDto): string {
    return user && user.username ? `${user.fullName} - ${user.username}` : '';
  }

  private countTaxAmount(): string {
    let netAmount = Number(this.newInvoiceForm.get('netAmount').value);
    let taxPercentage = Number(this.newInvoiceForm.get('taxPercentage').value);
    let taxAmount = (netAmount * taxPercentage) / 100;
    return taxAmount.toFixed(4);
  }

  private countGrossAmount(): string {
    let netAmount = Number(this.newInvoiceForm.get('netAmount').value);
    let taxAmount = Number(this.newInvoiceForm.get('taxAmount').value);
    let grossAmount = netAmount + taxAmount;
    return grossAmount.toFixed(4);
  }

  private _filter(name: string): UserDto[] {
    const filterValue = name.toLowerCase();

    return this.users.filter(user => user.fullName.toLowerCase().indexOf(filterValue) === 0 ||
                                     user.username.toLowerCase().indexOf(filterValue) === 0);
  }
}
