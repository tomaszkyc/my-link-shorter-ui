import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import * as jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_ENDPOINT: string = '/server/api/v1/auth';
  currentUser: User = null;

  constructor(private http: HttpClient,
              private router: Router) { }

  loginUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.API_ENDPOINT}/login`, user);
  }

  activateUserAccount(userId: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.API_ENDPOINT}/activate-account`, userId);
  }

  onSuccessLogin(authResult: any): void {
    this.setSession(authResult);
  }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.API_ENDPOINT}/register`, user);
  }

  validateUserToken(token: string): Observable<any> {
    return this.http.post<any>(`${this.API_ENDPOINT}/validate-user-token`, token);
  }

  private setSession(authResult) {
    const expiresAt: Date = new Date(authResult.expiresAt);
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    const currentDate: Date = new Date();
    let status: boolean = false;
    const expirationDate: Date = this.getExpiration();
    if (expirationDate) {
      status = currentDate.getTime() < expirationDate.getTime();
    }
    console.log(`Czy aktualny użytkownik jest zalogowany? ${status}`);
    return status;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getCurrentUserToken(): string {
    const jwtToken = localStorage.getItem('id_token');
    return jwtToken;
  }

  getExpiration() {
    const expirationDateInCookie = localStorage.getItem("expires_at");
    return new Date(JSON.parse(expirationDateInCookie));
  }

  getCurrentUser(): User {
    try {
      const jwtToken = localStorage.getItem('id_token');
      if (jwtToken) {
        this.currentUser = this.buildUserFromToken(jwtToken);
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas pobierania użytkownika z tokenu' + error);
      console.log('Nastąpi wylogowanie użytkownika i przekierowanie na stronę logowania');
      this.logout();
      this.router.navigate(['/pages/login']);
    }
    return this.currentUser;
  }

  buildUserFromToken(jwtToken): User {
    let user: User = null;
    const decodedToken: { [key: string] : string } = jwt_decode(jwtToken);
    user = new User(decodedToken.sub, null, decodedToken.fullname, decodedToken.email);
    user.enabled = Boolean(decodedToken.enabled);
    user.authrities = Object.keys(decodedToken.authorities);
    return user;
  }
}
