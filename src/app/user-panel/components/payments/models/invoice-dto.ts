import {PaymentDto} from "./payment-dto";
import {UserDto} from "../../users/models/user-dto";
import {PaymentStatus} from "./payment-status";

export class InvoiceDto {
  id: string;
  invoiceNumber: string;
  creationDate: Date;
  sellerName: string;
  sellerAddress: string;
  sellerTaxIdentifier: string;
  invoiceDescription: string;
  currency: string;
  netAmount: number;
  taxAmount: number;
  grossAmount: number;
  payment: PaymentDto;
  user: UserDto;
}
