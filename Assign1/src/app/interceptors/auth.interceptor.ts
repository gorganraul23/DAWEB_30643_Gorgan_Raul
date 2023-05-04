import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LoginService} from "../log-in/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: LoginService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
