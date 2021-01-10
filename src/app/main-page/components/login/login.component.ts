import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/security/services/auth.service";
import {User} from "../../../shared/security/models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    console.log('przed pokazaniem parametrow');
    /*    this.route.params.subscribe(params => {
          let id = params.id;
          console.log(id);
        });*/
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.signUser();
    }
  }

  signUser(): void {
    const username: string = this.loginForm.get('email').value;
    const password: string = this.loginForm.get('password').value;
    let user: User = new User(username, password, null, username);

    this.authService.loginUser(user).subscribe(
      data => {
        console.log('Użytkownik pomyślnie zalogowany');
        this.authService.onSuccessLogin(data);
        this.router.navigate(['/app']);
      },
      (error: HttpErrorResponse) => {
        this.handleLoginError(error);
      }
    );
  }

  clearForm(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 100);
  }

  handleLoginError(error: HttpErrorResponse): void {
    console.error('Problem z logowaniem: ' + error.message);
    console.error(error);
    const errorMessage: string = 'Wystąpił błąd podczas próby zalogowania. ' +
      'Sprawdź, czy dane podane do logowania są poprawne i spróbuj ponownie.';
    this.snackBar.open(errorMessage, '', {duration: 10000});
  }
}
