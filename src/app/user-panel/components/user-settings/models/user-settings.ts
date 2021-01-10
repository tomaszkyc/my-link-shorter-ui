export class UserSettings {
  username: string;
  password: string;
  fullname: string;
  email: string;
  userAdditionalProperties: { [key: string]: any } = {};


  constructor(username: string, password: string, fullname: string, email: string) {
    this.username = username;
    this.password = password;
    this.fullname = fullname;
    this.email = email;
  }

  setAdditionalProperty(key: string, value: any): void {
    this.userAdditionalProperties[key] = value;
  }

  getAdditionalProperty(key: string): any {
    return this.userAdditionalProperties[key];
  }
}
