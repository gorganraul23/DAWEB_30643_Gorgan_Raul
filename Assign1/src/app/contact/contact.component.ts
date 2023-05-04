import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  mapType = 'roadmap';
  lat = 46.764718;
  long = 23.565401;
  zoom = 14;

  markers = [
    { lat: this.lat, lng: this.long, alpha: 1 },
  ];
}
