import {Component} from '@angular/core';
import {UserRegister} from "./register.service";
import {Router} from "@angular/router";
import {RegisterService} from "./register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: UserRegister = {name: '', email: '', password: ''}

  constructor(private service: RegisterService, private router: Router) {
  }

  register() {
    this.service.register(this.user.name, this.user.email, this.user.password).subscribe(res => {
      console.log(this.user)
      console.log(res);
      this.router.navigate(['login']);
    })
  }
}
