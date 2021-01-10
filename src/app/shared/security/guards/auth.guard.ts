import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let allowedAuthorities = this.getAllowedAuthoritiesForRoute(route);
    console.log(`Pobrane authorities: ${allowedAuthorities}`);
    if (!allowedAuthorities) {
      console.log('Brak podanych allowed Authorities. Nie pozwalam na wejście do ścieżki: ' + route.url);
      this.router.navigate(['/app/not-authorize']);
      return false;
    }
    const currentUser: User = this.authService.getCurrentUser();
    if (!currentUser) {
      console.log('Użytkownik nie jest zalogowany!');
      this.router.navigate(['/pages/login']);
      return false;
    }

    //validate token
    const currentUserToken = this.authService.getCurrentUserToken();
    this.authService.validateUserToken(currentUserToken).subscribe(result => {
      const isUserTokenValid = Boolean(result);
      if (isUserTokenValid) {
        console.log('Podany token jest poprawny');
      } else {
        console.log('Podany token nie jest poprawny - możliwe, że ktoś zmienił lokalnie jego zawartość.');
        this.authService.logout();
        this.router.navigate(['/pages/login']);
        return false;
      }
    }, error => console.error('Błąd podczas weryfikacji tokenu: ' + error.message));

    if (currentUser.hasAnyAuthority(allowedAuthorities)) {
      console.log('Użytkownik ma uprawnienia do ścieżki: ' + route.url);
      return true;
    }
    console.log('Użytkownik nie ma uprawnienia do ścieżki: ' + route.url);
    this.router.navigate(['/app/not-authorize']);
    return false;
  }

  getAllowedAuthoritiesForRoute(route: ActivatedRouteSnapshot): string[] {
    if (route && route.data.allowedAuthorities) {
      return route.data.allowedAuthorities;
    }
    return null;
  }
}
