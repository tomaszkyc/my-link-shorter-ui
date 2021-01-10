export class CurrencyDto {
  currencyCode: string;

  constructor(currencyCode: string) {
    this.currencyCode = currencyCode;
  }

  public static generateValues(): CurrencyDto[] {
    let list: CurrencyDto[] = [];
    list.push(new CurrencyDto('PLN'));
    return list;
  }

  public static parse(value: string): CurrencyDto | undefined {
    return this.generateValues().find(c => c.currencyCode === value);
  }

  public static compareCurrency(s1: CurrencyDto, s2: CurrencyDto): boolean {
    return s1 && s2 ? s1.currencyCode === s2.currencyCode : s1 === s2;
  }

  public static getDefaultCurrency(): CurrencyDto {
    return new CurrencyDto('PLN');
  }
}
