import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent {

  constructor(private dialogRef: MatDialogRef<LoginPopupComponent>, private router: Router) {
  }

  ok() {
      this.router.navigate(['login']);
      window.scrollTo(0,0);
  }
}
