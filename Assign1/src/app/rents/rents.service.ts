import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Locuinta} from "../sells/sells.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RentsService {

  apiUrl = environment.apiUrl;
  locuinteUrl = environment.apiEndpoints.locuinte;
  typeUrl = environment.apiEndpoints.type;

  constructor(private http: HttpClient) { }

  getAllByType(transaction_type: number, type: number): Observable<Locuinta[]> {
    return this.http.get<Locuinta[]>(this.apiUrl + this.locuinteUrl + this.typeUrl + transaction_type + '/' + type + '/')
  }
}
