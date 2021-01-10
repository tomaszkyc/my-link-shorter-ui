import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/security/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {SidenavDirection} from "./models/sidenav-direction";
import {CustomPageSize} from "./models/custom-page-size";
import {UserSettingsService} from "./services/user-settings.service";
import {UserSettings} from "./models/user-settings";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  dataFetched: boolean = false;
  userSettingsForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  sidenavDirections: SidenavDirection[];
  customPageSizes: CustomPageSize[];

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router,
              private userSettingsService: UserSettingsService) {
    this.userSettingsForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', []),
      passwordRepeat: new FormControl('', []),
      sidenavDirection: new FormControl(''),
      customPageSize: new FormControl('', [])
    }, {
      validators: ValidatePasswordsEquality
    });
  }

  ngOnInit(): void {
    this.sidenavDirections = SidenavDirection.generateValues();
    this.customPageSizes = CustomPageSize.generateValues();
    this.getUserSettings();
  }

  getUserSettings(): void {
    this.userSettingsService.getUserSettings().subscribe((userSettings: UserSettings) => {
        console.log('user settings fetched!');
        console.log(userSettings);
        this.setUserDetailsToForm(userSettings);
        this.dataFetched = true;
      },
      (error: HttpErrorResponse) => {
        console.error('There was an error on fetching user details' + error.error);
      });
  }

  onSubmit() {
    let password = this.userSettingsForm.get('password').value;
    let isFormValid = this.userSettingsForm.valid;
    let isPasswordValid: boolean = this.validatePassword(password);
    let isFormAndPasswordFieldsValid = isFormValid && isPasswordValid;
    if (isFormValid || isFormAndPasswordFieldsValid) {
      this.changeUserSetting();
    }
  }

  changeUserSetting() {
    let userSettings: UserSettings = this.buildUserObjectFromUserSettingsForm();
    console.log('Stworzony użytkownik');
    console.log(userSettings);
    this.userSettingsService.updateUserSettings(userSettings).subscribe(result => {
      this.snackBar.open(result, '', {duration: 5000});
        this.userSettingsForm.get('password').setValue('');
        this.userSettingsForm.get('passwordRepeat').setValue('');
        this.userSettingsForm.get('password').setErrors(null);
        this.userSettingsForm.get('passwordRepeat').setErrors(null);
        this.userSettingsForm.markAsUntouched();
    },
      (error: HttpErrorResponse) => {
      let errorMessage = 'Wystąpił błąd poczas aktualizacji ustawień użytkownika: ' + error.error;
      console.error(errorMessage);
      this.snackBar.open(errorMessage, '', {duration: 5000});
      });
  }

  buildUserObjectFromUserSettingsForm() {
    const username: string = this.userSettingsForm.get('email').value;
    const password: string = this.userSettingsForm.get('password').value;
    const fullname: string = this.userSettingsForm.get('name').value;
    let userSettings: UserSettings = new UserSettings(username, password, fullname, username);
    const sidenavDirection: SidenavDirection = this.userSettingsForm.get('sidenavDirection').value;
    const customPageSize: CustomPageSize = this.userSettingsForm.get('customPageSize').value;
    userSettings.setAdditionalProperty('sidenav-position', sidenavDirection.value);
    userSettings.setAdditionalProperty('custom-page-size', customPageSize.pageSize);
    return userSettings;
  }

  resetToUserSettingsFromDatabase(): void {
    this.userSettingsForm.reset({});
    this.userSettingsForm.get('name').setErrors(null);
    this.userSettingsForm.get('email').setErrors(null);
    this.userSettingsForm.get('password').setErrors(null);
    this.userSettingsForm.get('passwordRepeat').setErrors(null);
    this.userSettingsForm.markAsUntouched();
    this.dataFetched = false;
    this.getUserSettings();
  }

  testPasswordLength(password: string): boolean {
    return password?.length >= 6;
  }

  testPasswordOneLetter(password: string): boolean {
    if (password) {
      let regexp: RegExp = new RegExp('[a-zA-Z]');
      return regexp.test(password);
    } else {
      return false;
    }
  }

  testPasswordOneNumber(password: string): boolean {
    let regexp: RegExp = new RegExp('[0-9]');
    return regexp.test(password);
  }

  testPasswordOneSpecialCharacter(password: string): boolean {
    let regexp: RegExp = new RegExp('[^\\w\\s]');
    return regexp.test(password);
  }

  validatePassword(password: string): boolean {
    return this.testPasswordLength(password) && this.testPasswordOneLetter(password)
      && this.testPasswordOneNumber(password) && this.testPasswordOneSpecialCharacter(password);
  }

  getPasswordLength(): number {
    const password: string = (this.userSettingsForm.get('password').value as string);
    if (password) {
      return password.length;
    } else {
      return 0;
    }
  }

  private setUserDetailsToForm(userSettings: UserSettings): void {
    this.userSettingsForm.get('name').setValue(userSettings.fullname);
    this.userSettingsForm.get('email').setValue(userSettings.email);
    let fetchedSidenavDirection = SidenavDirection.parse(userSettings.userAdditionalProperties['sidenav-position']);
    let fetchedCustomPageSize = CustomPageSize.parse(userSettings.userAdditionalProperties['custom-page-size']);
    this.userSettingsForm.patchValue({
      'sidenavDirection': fetchedSidenavDirection,
      'customPageSize': fetchedCustomPageSize
    });
  }

  compareSidenavDirection(s1: SidenavDirection, s2: SidenavDirection): boolean {
    return s1 && s2 ? s1.value === s2.value : s1 === s2;
  }

  compareCustomPageSize(s1: CustomPageSize, s2: CustomPageSize): boolean {
    return s1 && s2 ? s1.pageSize === s2.pageSize : s1 === s2;
  }
}


export function ValidatePasswordLength(control: AbstractControl): { [key: string]: any } | null {
  if (control.value && control.value.length < 6) {
    return {ValidatePasswordLength: true};
  }
  return null;
}

export function ValidatePasswordOneLetter(control: AbstractControl): { [key: string]: any } | null {
  let regexp: RegExp = new RegExp('[a-zA-Z]');
  if (!regexp.test(control.value)) {
    return {ValidatePasswordOneLetter: true};
  }
  return null;
}

export function ValidatePasswordOneNumber(control: AbstractControl): { [key: string]: any } | null {
  let regexp: RegExp = new RegExp('[0-9]');
  if (!regexp.test(control.value)) {
    return {ValidatePasswordOneNumber: true};
  }
  return null;
}

export function ValidatePasswordOneSpecialCharacter(control: AbstractControl): { [key: string]: any } | null {
  let regexp: RegExp = new RegExp('[^\\w\\s]');
  if (!regexp.test(control.value)) {
    return {ValidatePasswordOneSpecialCharacter: true};
  }
  return null;
}


export function ValidatePasswordsEquality(control: FormGroup): { [key: string]: any } | null {
  let password = control.get('password');
  let passwordRepeat = control.get('passwordRepeat');

  if (password.value !== passwordRepeat.value) {
    passwordRepeat.setErrors({ValidatePasswordsEquality: true});
  }
  return null;
}
