import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../profile-page/profile-page.component";

export interface ReservationRequest {
  user_id: number,
  locuinta_id: number,
  date_time: Date
}

export interface Reservation {
  user_id: number,
  locuinta_id: number,
  date_time: string,
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  apiUrl = environment.apiUrl;
  locuinte = environment.apiEndpoints.locuinte;

  constructor(private http: HttpClient) {
  }

  makeReservation(request: ReservationRequest): Observable<any> {
    const make_reservation = environment.apiEndpoints.make_reservation;
    return this.http.post<any>(this.apiUrl + this.locuinte + make_reservation, request);
  }

  verifyAvailableReservation(request: ReservationRequest): Observable<ReservationRequest[]> {
    const available = environment.apiEndpoints.available;
    return this.http.post<ReservationRequest[]>(this.apiUrl + this.locuinte + available, request);
  }

  getActiveReservationPerDay(request: Reservation): Observable<ReservationRequest[]> {
    const active = environment.apiEndpoints.active;
    return this.http.post<ReservationRequest[]>(this.apiUrl + this.locuinte + active, request);
  }

  getReservationsPerMonth(request: Reservation): Observable<ReservationRequest[]> {
    const stat = environment.apiEndpoints.stat;
    return this.http.post<ReservationRequest[]>(this.apiUrl + this.locuinte + stat, request);
  }

}
