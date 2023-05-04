import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatMenuTrigger} from "@angular/material/menu";
import {LoginService} from "../log-in/login.service";


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  //connected = false;

  constructor(private router: Router, public auth_service: LoginService) {
  }

  ngOnInit(): void{
    //this.connected = this.auth_service.isLoggedIn
  }

  onClickHomeBtn() {
    this.router.navigate(['/home']);
    window.scrollTo(0, 0)
  }

  onClickNoutatiBtn() {
    this.router.navigate(['/news']);
    window.scrollTo(0, 0)
  }

  onClickAboutUsBtn() {
    this.router.navigate(['/about-us']);
    window.scrollTo(0, 0)
  }

  onClickInchirieriBtn() {
  }

  onClickVanzariBtn() {
  }

  onClickContactBtn() {
    this.router.navigate(['/contact']);
    window.scrollTo(0, 0)
  }

  onClickProfileBtn() {
    this.router.navigate(['/profile']);
  }

  onClickLogin() {
    this.router.navigate(['/login']);
  }

  onClickRegister() {
    this.router.navigate(['/register']);
  }

  onClickLogout() {
    this.auth_service.logout();
    this.router.navigate(['/home']);
  }


  openMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }


  closeMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();
  }

  /////inchirieri menu

  onClickGars() {
    this.router.navigate(['/rents'], {queryParams: {destination: 'garsoniereinch'}})
  }

  onClickAp() {
    this.router.navigate(['/rents'], {queryParams: {destination: 'ap1inch'}})
  }

  onClickCase() {
    this.router.navigate(['/rents'], {queryParams: {destination: 'caseinch'}})
  }

  onClickSpBir() {
    this.router.navigate(['/rents'], {queryParams: {destination: 'spbirinch'}})
  }

  onClickSpCom() {
    this.router.navigate(['/rents'], {queryParams: {destination: 'spcominch'}})
  }


  /// vanzari menu

  onClickGarsVanz() {
    this.router.navigate(['/sells'], {queryParams: {destination: 'garsonierevanz'}})
  }

  onClickApVanz() {
    this.router.navigate(['/sells'], {queryParams: {destination: 'ap1vanz'}})
  }

  onClickCaseVanz() {
    this.router.navigate(['/sells'], {queryParams: {destination: 'casevanz'}})
  }

  onClickSpBirVanz() {
    this.router.navigate(['/sells'], {queryParams: {destination: 'spbirvanz'}})
  }

  onClickSpComVanz() {
    this.router.navigate(['/sells'], {queryParams: {destination: 'spcomvanz'}})
  }

}
