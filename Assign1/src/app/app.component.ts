import { Component } from '@angular/core';

export const transaction_types_id = [1, 2] as const;
type TransTypeID = typeof transaction_types_id[number];
export const trans_types_label: Record<TransTypeID, string> = {
  1: 'Vanzare',
  2: 'Inchiriere',
} as const;

export const types_id = [1, 2, 3, 4, 5, 6, 7, 8] as const;
type TypeID = typeof types_id[number];
export const types_label: Record<TypeID, string> = {
  1: 'Garsoniera',
  2: 'Apartament 1 camera',
  3: 'Apartament 2 camere',
  4: 'Apartament 3 camere',
  5: 'Apartament 4 camere',
  6: 'Casa',
  7: 'Spatiu birouri',
  8: 'Spatiu comercial'
} as const;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assign1';
}
