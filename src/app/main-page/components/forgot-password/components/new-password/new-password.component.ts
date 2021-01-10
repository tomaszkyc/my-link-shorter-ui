import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {ResetPasswordService} from "../../services/reset-password.service";
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {UserDto} from "../../../../../user-panel/components/users/models/user-dto";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  isResetPasswordTokenValid: boolean = false;
  dataFetched: boolean = false;
  passwordResetToken: string;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;


  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private resetPasswordService: ResetPasswordService,
              private route: ActivatedRoute) {
    this.newPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, ValidatePasswordLength, ValidatePasswordOneLetter,
        ValidatePasswordOneNumber, ValidatePasswordOneSpecialCharacter]),
      passwordRepeat: new FormControl('', [Validators.required])
    }, {
      validators: ValidatePasswordsEquality
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.passwordResetToken = params.id;
      this.validatePasswordResetToken(this.passwordResetToken);
    });
  }

  validatePasswordResetToken(passwordResetToken: string): void {
    this.resetPasswordService.validatePasswordResetToken(passwordResetToken).subscribe((isValid: boolean) => {
        this.isResetPasswordTokenValid = isValid;
        this.dataFetched = true;
      },
      (error: HttpErrorResponse) => {
        let errorMessage = error.error;
        console.log(errorMessage);
        this.dataFetched = true;
      });
  }

  clearForm(): void {
    setTimeout(() => {
      this.newPasswordForm.reset({});
      this.newPasswordForm.get('password').setErrors(null);
      this.newPasswordForm.get('passwordRepeat').setErrors(null);
      this.newPasswordForm.markAsUntouched();
    }, 100);
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

  getPasswordLength(): number {
    const password: string = (this.newPasswordForm.get('password').value as string);
    if (password) {
      return password.length;
    } else {
      return 0;
    }
  }

  onSubmit(): void {
    if (this.newPasswordForm.valid) {
      console.log('formularz poprawny');
      this.saveNewUserPassword();
    }
  }

  saveNewUserPassword(): void {
    let userDto = this.buildUserDtoObjectFromNewPasswordForm();
    this.resetPasswordService.saveNewUserPassword(this.passwordResetToken, userDto).subscribe((result: string) => {
        this.snackBar.open(result, '', {duration: 5000});
        this.router.navigate(['pages/login']);
      },
      (error: HttpErrorResponse) => {
        let errorMessage = error.error;
        this.snackBar.open(errorMessage, '', {duration: 5000});
      });
  }

  buildUserDtoObjectFromNewPasswordForm(): UserDto {
    let userDto: UserDto = new UserDto();
    userDto.password = this.newPasswordForm.get('password').value;
    return userDto;
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
