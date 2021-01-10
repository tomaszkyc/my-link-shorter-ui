import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem("id_token");
    if (userToken) {
      const cloned = req.clone({
        headers: req.headers.set(this.AUTH_HEADER, "Bearer " + userToken)
      });
      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
