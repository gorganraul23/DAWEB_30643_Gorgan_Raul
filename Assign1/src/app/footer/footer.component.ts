import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../log-in/login.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private router: Router, private auth_service: LoginService) {
  }

  ///////first row

  onNewsClick() {
    this.router.navigate(['/news'])
    window.scrollTo(0, 0)
  }

  onClickContact() {
    this.router.navigate(['/contact'])
    window.scrollTo(0, 0)
  }

  onClickAboutUs() {
    this.router.navigate(['/about-us'])
    window.scrollTo(0, 0)
  }

  onClickClients() {
    this.router.navigate(['/about-us'], {queryParams: {destination: 'feedback'}})
  }

  onClickOffer() {
    if (this.auth_service.isAuthenticated()) {
      this.router.navigate(['/profile'])
      window.scrollTo(0,0)
    } else {
      this.router.navigate(['/login'])
      window.scrollTo(0,0)
    }
  }


  //// second row
  onClickGarsVanz() {
    this.router.navigate(['/sells'], {queryParams: {destination: 'garsonierevanz'}})
  }

  onClickApVanz() {
    this.router.navigate(['/sells'], {queryParams: {destination: 'ap1vanz'}})
  }

  onClickCasaVanz() {
    this.router.navigate(['/sells'], {queryParams: {destination: 'casevanz'}})
  }

  onClickSpBirVanz() {
    this.router.navigate(['/sells'], {queryParams: {destination: 'spbirvanz'}})
  }

  onClickSpComVanz() {
    this.router.navigate(['/sells'], {queryParams: {destination: 'spcomvanz'}})
  }

  ///// third row

  onClickGarsInch() {
    this.router.navigate(['/rents'], {queryParams: {destination: 'garsoniereinch'}})
  }

  onClickApInch() {
    this.router.navigate(['/rents'], {queryParams: {destination: 'ap1inch'}})
  }

  onClickCasaInch() {
    this.router.navigate(['/rents'], {queryParams: {destination: 'caseinch'}})
  }

  onClickSpBirInch() {
    this.router.navigate(['/rents'], {queryParams: {destination: 'spbirinch'}})
  }

  onClickSpComInch() {
    this.router.navigate(['/rents'], {queryParams: {destination: 'spcominch'}})
  }
}
