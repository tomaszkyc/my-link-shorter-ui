export class CustomPageSize {
  pageSize: number;

  constructor(pageSize: number) {
    this.pageSize = pageSize;
  }


  public static generateValues(): CustomPageSize[] {
    let list: CustomPageSize[] = [];
    list.push(new CustomPageSize(5));
    list.push(new CustomPageSize(10));
    list.push(new CustomPageSize(20));
    list.push(new CustomPageSize(50));
    return list;
  }

  public static parse(value: number): CustomPageSize {
    return this.generateValues().find(s => s.pageSize == value);
  }

}
