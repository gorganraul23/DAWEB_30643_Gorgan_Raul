import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrl = environment.apiUrl
  private registerUrl = environment.apiEndpoints.register;

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string) {
    console.log(name, email, password)
    //return this.http.post<any>(this.apiUrl + this.registerUrl, {name, email, password });
    return this.http.post<any>(this.apiUrl + this.registerUrl, { name, email, password }).pipe(
      tap(response => {
        // sessionStorage.setItem('access_token', response.access_token);
        // sessionStorage.setItem('user_id', response.user_id);
        console.log(response)
      })
    );
  }
}
