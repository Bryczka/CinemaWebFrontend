import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { appRoutes } from './routes';
import { FilmService } from './_services/film.service';
import { FilmshowsComponent } from './filmshows/filmshows.component';
import { FilmsComponent } from './films/films.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HallsComponent } from './halls/halls.component';
import { FilmsDetailedComponent } from './filmsDetailed/filmsDetailed.component';
import { TicketsComponent } from './tickets/tickets.component';
import { LoginComponent } from './login/login.component';
import { PaypalComponent } from './paypal/paypal.component';
import { UserTicketsComponent } from './user-tickets/user-tickets.component';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { NavigateTicketsComponent } from './_modals/navigate-tickets/navigate-tickets.component';
import { ErrorInterceptorProvider } from './_interceptors/error.interceptor';


export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      FilmshowsComponent,
      HallsComponent,
      FilmsComponent,
      FilmsDetailedComponent,
      TicketsComponent,
      LoginComponent,
      PaypalComponent,
      UserTicketsComponent,
      NavigateTicketsComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      BsDropdownModule.forRoot(),
      BrowserAnimationsModule,
      NgbModule,
      CarouselModule.forRoot(),
      ModalModule.forRoot(),
      MatDialogModule,
      MatInputModule,
      ReactiveFormsModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5001'],
            blacklistedRoutes: ['localhost:5001/users']
         }
      })
   ],
   providers: [
      AuthService,
      FilmService,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      NavigateTicketsComponent,
      RegisterComponent
   ]
})
export class AppModule { }
