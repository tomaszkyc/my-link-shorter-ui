import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ResetPasswordService} from "./services/reset-password.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  //ten komunikat powinien iść z backendu
  successSendResetPassword: string = 'Jeśli posiadasz konto w naszym systemie ' +
    'otrzymasz za chwilę maila z linkiem do zresetowania hasła.';


  forgotPasswordForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private _snackBar: MatSnackBar,
              private resetPasswordService: ResetPasswordService) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const username = this.forgotPasswordForm.get('email').value;
      this.sendResetPasswordEmail(username);
    }
  }

  sendResetPasswordEmail(username: string): void {
    this.resetPasswordService.resetPassword(username).subscribe( (result: string) => {
      console.log(result);
      this.showSnackBarWithMessage(this.successSendResetPassword);
    },
      (error: HttpErrorResponse) => {
      console.error(error.error);
      this._snackBar.open(error.error, '', {duration: 5000});
      });
  }

  showSnackBarWithMessage(message: string): void {
    this._snackBar.open(message, '', {
      duration: 10000
    });
  }
}
