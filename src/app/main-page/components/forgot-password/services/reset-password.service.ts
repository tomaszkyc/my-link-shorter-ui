import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../../../../user-panel/components/users/models/user-dto";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private API_ENDPOINT: string = '/server/api/v1/reset-password';

  constructor(private http: HttpClient) {
  }

  resetPassword(username: string): Observable<string> {
    return this.http.post<string>(`${this.API_ENDPOINT}/send-password-reset-token`, username);
  }

  validatePasswordResetToken(passwordResetToken: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_ENDPOINT}/${passwordResetToken}/validate-password-reset-token`);
  }

  saveNewUserPassword(passwordResetToken: string, userDto: UserDto): Observable<string> {
    return this.http.post<string>(`${this.API_ENDPOINT}/${passwordResetToken}/reset`, userDto.password);
  }
}
