import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  types: string[] = ['Tip tranzactie', 'Vanzare', 'Inchiriere'];
  propertyTypes: string[] = ['Tip proprietate', 'Garsoniera', 'Apartament','Casa', 'Spatiu birou', 'Spatiu comercial'];
  locations: string[] = ['Oras', 'Cluj-Napoca', 'Floresti', 'Chinteni'];
  zones: string[] = ['Zona', 'Plopilor', 'Zorilor','Manastur', 'Marasti', 'Iris'];
}
