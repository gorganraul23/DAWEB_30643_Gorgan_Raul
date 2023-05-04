import { Component } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

  types: string[] = ['Tip tranzactie', 'Vanzare', 'Inchiriere'];
  propertyTypes: string[] = ['Tip proprietate', 'Garsoniera', 'Apartament','Casa', 'Spatiu birou', 'Spatiu comercial'];
  locations: string[] = ['Oras', 'Cluj-Napoca', 'Floresti', 'Chinteni'];
  zones: string[] = ['Zona', 'Plopilor', 'Zorilor','Manastur', 'Marasti', 'Iris'];

}
