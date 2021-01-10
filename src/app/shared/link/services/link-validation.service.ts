import {Injectable, Injector} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LinkValidationService {

  constructor() { }

  public static isShortLinkAlreadyShortened(control: AbstractControl): { [key: string]: any } | null {
    let injector: Injector = Injector.create({providers: [{provide: LinkValidationService, deps: []}]})
    let linkValidationService: LinkValidationService = injector.get(LinkValidationService);
    let value = control.value;
    if (value && linkValidationService.isShortLinkAlreadyShortened(value)) {
      console.log('Link nie jest poprawny: ' + value);
      return {isShortLinkAlreadyShortened: true};
    }
    console.log('link jest poprawny: ' + value);
    return null;
  }

  isShortLinkAlreadyShortened(shortLink: string): boolean {
    let regExp = this.buildRegexp();
    if (regExp.test(shortLink)) {
      return true;
    }
    return false;
  }

  private buildRegexp(): RegExp {
    let hostname = this.getHostname();
    let pattern = '^http://localhost|^localhost|^https://localhost|www.localhost';
    let patternWithCorrectHostname = pattern.split('localhost').join(hostname);
    return new RegExp(patternWithCorrectHostname);
  }

  private getHostname(): string {
    return window.location.hostname;
  }
}
