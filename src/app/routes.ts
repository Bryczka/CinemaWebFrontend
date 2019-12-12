import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FilmsComponent } from './films/films.component';
import { FilmshowsComponent } from './filmshows/filmshows.component';
import { HallsComponent } from './halls/halls.component';
import { FilmsDetailedComponent } from './filmsDetailed/filmsDetailed.component';
import { TicketsComponent } from './tickets/tickets.component';
import { UserTicketsComponent } from './user-tickets/user-tickets.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'films', component: FilmsComponent},
    {path: 'filmshows', component: FilmshowsComponent},
    {path: 'halls', component: HallsComponent},
    {path: 'tickets', component: TicketsComponent},
    {path: 'films/details', component: FilmsDetailedComponent},
    {path: 'user/tickets', component: UserTicketsComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
