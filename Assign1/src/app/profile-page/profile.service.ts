import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Locuinta} from "../sells/sells.service";
import {Observable} from "rxjs";

export interface Location{
  city: string;
  region: string;
  country: string;
  ip: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiUrl = environment.apiUrl
  userUrl = environment.apiEndpoints.user
  locuinteUrl = environment.apiEndpoints.locuinte

  constructor(private http: HttpClient) { }

  getUserById(id:string){
    return this.http.get<any>(this.apiUrl + this.userUrl + id);
  }

  updateUser(id: string, name: string, email: string, preferences: number[]){
    return this.http.put<any>(this.apiUrl + this.userUrl + id + '/', {name, email, preferences});
  }

  addOffer(body: Locuinta){
    return this.http.post<any>(this.apiUrl + this.locuinteUrl, body);
  }

  getOffersByUser(id: string, type: number){
    const propritary = environment.apiEndpoints.proprietary;
    const typeUrl = environment.apiEndpoints.type;
    return this.http.get<any>(this.apiUrl + this.locuinteUrl + propritary + id + '/' + typeUrl + type + '/');
  }

  getFavoritesByUser(id: string){
    const favorite = environment.apiEndpoints.favorite;
    return this.http.get<any>(this.apiUrl + this.locuinteUrl + favorite + id + '/');
  }

  getAll(){
    return this.http.get<any>(this.apiUrl + this.locuinteUrl);
  }

  deleteResidence(id: string){
    return this.http.delete<any>(this.apiUrl + this.locuinteUrl + id + '/');
  }

  updateResidence(body: Locuinta){
    console.log(body);
    return this.http.put<any>(this.apiUrl + this.locuinteUrl + body.id + '/', body);
  }

  getAllByType(transaction_type: number, type: number): Observable<Locuinta[]> {
    const typeUrl = environment.apiEndpoints.type;
    return this.http.get<Locuinta[]>(this.apiUrl + this.locuinteUrl + typeUrl +'/' + type + '/')
  }

  getAllByTypeOfResidence(type: number): Observable<Locuinta[]> {
    const typeUrl = environment.apiEndpoints.type;
    return this.http.get<Locuinta[]>(this.apiUrl + this.locuinteUrl + typeUrl + type + '/')
  }
}
