import {Component} from '@angular/core';
import {LoginService, UserCredentials} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  user: UserCredentials = {email: '', password: ''}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  constructor(private service: LoginService, private router: Router) {
  }

  login() {
    this.service.login(this.user.email, this.user.password).subscribe(res => {
      console.log(res);
      if (this.service.isAuthenticated()) {
        this.service.isLoggedIn = true
        this.router.navigate(['profile']);
      }
    });
  }
}
