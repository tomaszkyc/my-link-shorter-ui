export class UserAuthorityDto {
  id: string;
  authority: string;
  displayName: string;
  constructor(authority: string, displayName: string) {
    this.authority = authority;
    this.displayName = displayName;
  }


  public static generateValues(): UserAuthorityDto[] {
    let values: UserAuthorityDto[] = [];
    values.push(new UserAuthorityDto('registered-user', 'Zarejestrowany użytkownik'));
    values.push(new UserAuthorityDto('premium-user', 'Użytkownik premium'));
    values.push(new UserAuthorityDto('admin', 'Administrator'));
    return values;
  }

  public static parse(value: string): UserAuthorityDto {
    return this.generateValues().find( s => s.authority === value );
  }

  public static parseMultiple(values: string[]): UserAuthorityDto[] {
    return this.generateValues().filter( v => values.indexOf( v.authority ) > -1 );
  }
}
