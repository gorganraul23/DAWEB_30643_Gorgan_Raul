import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {ContactComponent} from "./contact/contact.component";
import {AboutusComponent} from "./aboutus/aboutus.component";
import {NewsComponent} from "./news/news.component";
import {RentsComponent} from "./rents/rents.component";
import {SellsComponent} from "./sells/sells.component";
import {LogInComponent} from "./log-in/log-in.component";
import {RegisterComponent} from "./register/register.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about-us',
    component: AboutusComponent
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'rents',
    component: RentsComponent
  },
  {
    path: 'sells',
    component: SellsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
