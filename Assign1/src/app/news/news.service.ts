import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiUrl = environment.apiUrl;
  locuinteUrl = environment.apiEndpoints.locuinte;
  newsUrl = environment.apiEndpoints.news;

  constructor(private http: HttpClient) { }

  getAllNews(){
    return this.http.get<any>(this.apiUrl + this.locuinteUrl + this.newsUrl);
  }

}
