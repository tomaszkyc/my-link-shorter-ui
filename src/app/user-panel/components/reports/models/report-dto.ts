export class ReportDto {


  public put(key: string, value: any): void {
    this[key] = value;
  }

  public get(key: string): any {
    return this[key];
  }

  public anyDataFetched(): boolean {
    return this.dataValues().length > 0;
  }

  public keySet(): string[] {
    return Object.keys(this);
  }

  public dataLabels(): string[] {
    let keys = this.keySet();
    keys.forEach( value => {
      value += '';
    } );
    return keys;
  }

  public dataValues(): any[] {
    let values: any[] = [];
    this.keySet().forEach( key => {
      values.push( this.get(key) );
    });
    return values;
  }

  public getCategories(): any[] {
    return this.get('categories');
  }

  public static parse(object: any): ReportDto {
    let reportDto = new ReportDto();
    for(let key of Object.keys(object)) {
      let value = object[key];
      reportDto.put(key, value);
    }
    return reportDto;
  }
}
