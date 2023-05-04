import { Component } from '@angular/core';
import {Locuinta} from "../sells/sells.service";
import {NewsService} from "./news.service";

export interface House{
  price: string;
  describe: string;
  surface: number;
  rooms: number;
  location: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  index = 0;

  houses: House[] = [
    {price: '149 000', describe: 'Casa de vanzare', surface: 260, rooms: 5, location: 'Apahida, Cluj'},
    {price: '149 000', describe: 'Casa de vanzare', surface: 240, rooms: 4, location: 'Dezmir, Cluj'},
    {price: '149 000', describe: 'Casa de vanzare', surface: 240, rooms: 4, location: 'Chinteni, Cluj'},
    {price: '149 000', describe: 'Casa de vanzare', surface: 220, rooms: 4, location: 'Marasti, Cluj-Napoca'}
  ]

  news_list: Locuinta[] = [];

  constructor(private service: NewsService) {
  }

  ngOnInit():void {
    this.service.getAllNews().subscribe(res => {
      this.news_list = res;
      console.log(res);
    })
  }
}
