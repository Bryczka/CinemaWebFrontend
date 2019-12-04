import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FilmsComponent } from './films/films.component';
import { FilmshowsComponent } from './filmshows/filmshows.component';
import { HallsComponent } from './halls/halls.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'films', component: FilmsComponent},
    {path: 'filmshows', component: FilmshowsComponent},
    {path: 'halls', component: HallsComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
