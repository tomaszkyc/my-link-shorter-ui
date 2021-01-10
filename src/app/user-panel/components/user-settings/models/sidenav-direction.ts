export class SidenavDirection {
  value: string;
  viewValue: string;

  constructor(value: string, viewValue: string) {
    this.value = value;
    this.viewValue = viewValue;
  }

  public static generateValues(): SidenavDirection[] {
    let list: SidenavDirection[] = [];
    list.push(new SidenavDirection('ltr', 'Po lewej stronie'));
    list.push(new SidenavDirection('rtl', 'Po prawej stronie'));
    return list;
  }

  public static parse(value: string): SidenavDirection {
    console.log('parsowanie wartości: ' + value);
    let foundValue: SidenavDirection =  this.generateValues().find(s => s.value == value);
    return foundValue;
  }
}
