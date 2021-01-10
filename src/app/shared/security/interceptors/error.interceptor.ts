import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError( (error: HttpErrorResponse) => {
        console.error('There was an error: ' + error.error);
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/pages/login']);
        }
        else if (error.status === 504) {
          let serverErrorMessage = 'Wystąpił problem z naszymi usługami. Skontaktuj się z naszym działem wsparcia.'
          this.snackBar.open(serverErrorMessage, '', {duration: 10000});
          this.authService.logout();
          this.router.navigate(['/']);
        }
        return throwError(error);
      })
    );
  }

}
