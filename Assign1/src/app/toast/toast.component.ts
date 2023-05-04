import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ToastComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              public snackBarRef: MatSnackBarRef<ToastComponent>) { }


}
