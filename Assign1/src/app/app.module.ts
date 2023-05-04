import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AppRoutingModule} from './app-routing.module';
import {MenuBarComponent} from './menu-bar/menu-bar.component';
import {FooterComponent} from './footer/footer.component';
import {MaterialModule} from "./material.module";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {AgmCoreModule} from "@agm/core";
import {ContactComponent} from "./contact/contact.component";
import {MatGridListModule} from '@angular/material/grid-list';
import {AboutusComponent} from "./aboutus/aboutus.component";
import {NewsComponent} from "./news/news.component";
import {RentsComponent} from "./rents/rents.component";
import {SellsComponent} from "./sells/sells.component";
import {FiltersComponent} from "./filters/filters.component";
import {LogInComponent} from "./log-in/log-in.component";
import {RegisterComponent} from "./register/register.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "./log-in/login.service";
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {JwtModule} from "@auth0/angular-jwt";
import {ToastComponent} from "./toast/toast.component";
import {EditResidenceComponent} from "./profile-page/edit-residence/edit-residence.component";
import {DeleteResidenceComponent} from "./profile-page/delete-residence/delete-residence.component";
import {GeolocationService} from "@ng-web-apis/geolocation";
import {ReservationComponent} from "./reservation/reservation.component";
import {DateTimePickerModule, CalendarModule } from "@syncfusion/ej2-angular-calendars"
import {ReservationCalendarComponent} from "./reservation-calendar/reservation-calendar.component";
import {DatePipe} from "@angular/common";
import {LoginPopupComponent} from "./login-popup/login-popup.component";
import {NgChartsModule} from "ng2-charts";

export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}

export function idGetter(){
  return sessionStorage.getItem('user_id')!;
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MenuBarComponent,
    FooterComponent,
    ContactComponent,
    AboutusComponent,
    NewsComponent,
    RentsComponent,
    SellsComponent,
    FiltersComponent,
    LogInComponent,
    RegisterComponent,
    ProfilePageComponent,
    ToastComponent,
    EditResidenceComponent,
    DeleteResidenceComponent,
    ReservationComponent,
    ReservationCalendarComponent,
    LoginPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule,
    DateTimePickerModule,
    CalendarModule,
    NgChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBlpghps7bMf3j9F4m-Fy_rYZCmD2_igYo'
    }),
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
  ],
  providers: [
    LoginService,
    DatePipe,
    GeolocationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
