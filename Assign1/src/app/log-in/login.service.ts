import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

export interface UserCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = environment.apiUrl
  private loginUrl = environment.apiEndpoints.login;
  private jwtHelper = new JwtHelperService();

  isLoggedIn = false;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.apiUrl + this.loginUrl, {email, password}).pipe(
      tap(response => {
        sessionStorage.setItem('access_token', response.access_token);
        sessionStorage.setItem('user_id', response.user_id);
        sessionStorage.setItem('user_role', response.user_role);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_role');
    sessionStorage.removeItem('location');
    this.isLoggedIn = false
  }

  getToken() {
    const token = sessionStorage.getItem('access_token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return token;
    } else {
      this.logout();
      return null;
    }
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  isAgent(){
    return sessionStorage.getItem('user_role') && sessionStorage.getItem('user_role') == 'agent'
  }

}
