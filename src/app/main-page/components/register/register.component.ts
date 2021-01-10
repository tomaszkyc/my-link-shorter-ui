import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {User} from "../../../shared/security/models/user";
import {AuthService} from "../../../shared/security/services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUserAccountForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.registerUserAccountForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, ValidatePasswordLength, ValidatePasswordOneLetter,
        ValidatePasswordOneNumber, ValidatePasswordOneSpecialCharacter]),
      passwordRepeat: new FormControl('', [Validators.required])
    }, {
      validators: ValidatePasswordsEquality
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerUserAccountForm.valid) {
      this.registerUser();
    }
  }

  registerUser() {
    const username: string = this.registerUserAccountForm.get('email').value;
    const password: string = this.registerUserAccountForm.get('password').value;
    const fullname: string = this.registerUserAccountForm.get('name').value;
    let user: User = new User(username, password, fullname, username);
    this.authService.registerUser(user).subscribe(data => {
        this.clearForm();
        this.snackBar.open(data, '', {duration: 10000});
        this.router.navigate(['/pages/login']);
      },
      error => {
        this.snackBar.open((error as HttpErrorResponse).error, '', {
          duration: 10000
        });
      });
  }

  clearForm(): void {
    setTimeout(() => {
      this.registerUserAccountForm.reset({});
      this.registerUserAccountForm.get('name').setErrors(null);
      this.registerUserAccountForm.get('email').setErrors(null);
      this.registerUserAccountForm.get('password').setErrors(null);
      this.registerUserAccountForm.get('passwordRepeat').setErrors(null);
      this.registerUserAccountForm.markAsUntouched();
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
    const password: string = (this.registerUserAccountForm.get('password').value as string);
    if (password) {
      return password.length;
    } else {
      return 0;
    }
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
