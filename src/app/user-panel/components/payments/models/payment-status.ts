export class PaymentStatus {

  constructor(private _code: string, private _displayValue: string) {
  }


  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get displayValue(): string {
    return this._displayValue;
  }

  set displayValue(value: string) {
    this._displayValue = value;
  }

  public static generateValues(): PaymentStatus[] {
    let arr = [];
    arr.push(new PaymentStatus('CREATED', 'Oczekuje na zapłacenie'));
    arr.push(new PaymentStatus('PAID', 'Zapłacone'));
    arr.push(new PaymentStatus('CANCEL', 'Płatność anulowana'));
    return arr;
  }

  public static parse(value: string): PaymentStatus | undefined {
    return this.generateValues().find(s => s._code === value);
  }

  isPaid(): boolean {
    return this.code === 'PAID';
  }

}
