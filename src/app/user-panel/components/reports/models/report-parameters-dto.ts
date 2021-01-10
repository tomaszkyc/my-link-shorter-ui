export class ReportParametersDto {

  public put(key: string, value: any): void {
    this[key] = value;
  }

  public get(key: string): any {
    return this[key];
  }

  public keySet(): string[] {
    return Object.keys(this);
  }
}
