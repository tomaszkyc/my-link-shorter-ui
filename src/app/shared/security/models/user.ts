export class User {
  id: string;
  username: string;
  password: string;
  enabled: boolean;
  fullName: string;
  email: string;
  authrities: string[];

  constructor(username: string, password: string, fullName: string, email: string) {
    this.username = username;
    this.password = password;
    this.fullName = fullName;
    this.email = email;
  }

  public hasAnyAuthority(authorities: string[]): boolean {
    let hasAny: boolean = false;
    if (this && this.authrities) {
      hasAny = this.authrities.some(value => {
        return authorities.indexOf(value) > -1;
      });
    }
    return hasAny;
  }

  public hasAuthority(authorityName: string): boolean {
    if (this && this.authrities) {
      return this.authrities.indexOf(authorityName) > -1;
    }
    return false;
  }
}
