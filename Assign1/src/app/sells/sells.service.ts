import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

export interface Locuinta {
  id: number,
  transaction_type: number,
  type: number,
  description: string,
  price: number,
  square_meters: number,
  floor: string,
  rooms: string,
  city: string,
  zone: string,
  date_added: Date | null,
  img_path: string,
  user_id: string
}

@Injectable({
  providedIn: 'root'
})
export class SellsService {

  apiUrl = environment.apiUrl;
  locuinteUrl = environment.apiEndpoints.locuinte;
  typeUrl = environment.apiEndpoints.type;

  constructor(private http: HttpClient) {
  }

  getAllByType(transaction_type: number, type: number): Observable<Locuinta[]> {
    return this.http.get<Locuinta[]>(this.apiUrl + this.locuinteUrl + this.typeUrl + transaction_type + '/' + type + '/')
  }

}
