import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FilmsComponent } from './films/films.component';
import { FilmshowsComponent } from './filmshows/filmshows.component';
import { HallsComponent } from './halls/halls.component';
import { FilmsDetailedComponent } from './filmsDetailed/filmsDetailed.component';
import { TicketsComponent } from './tickets/tickets.component';
import { UserTicketsComponent } from './user-tickets/user-tickets.component';
import { AuthGuard } from './_guards/auth.guard';
import { RoleGuard } from './_guards/role.guard';
import { SetEmployeesComponent } from './set-employees/set-employees.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'films', component: FilmsComponent, canActivate: [RoleGuard]},
    {path: 'filmshows', component: FilmshowsComponent, canActivate: [RoleGuard]},
    {path: 'halls', component: HallsComponent, canActivate: [RoleGuard]},
    {path: 'tickets', component: TicketsComponent},
    {path: 'films/:filmId', component: FilmsDetailedComponent},
    {path: 'user/tickets', component: UserTicketsComponent, canActivate: [AuthGuard]},
    {path: 'roles', component: SetEmployeesComponent, canActivate: [RoleGuard]},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
