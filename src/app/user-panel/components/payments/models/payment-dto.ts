import {InvoiceDto} from "./invoice-dto";

export class PaymentDto {
  id: string;
  paymentDescription: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  creationDate: Date;
  paymentDate: Date;
  invoice: InvoiceDto;
}
