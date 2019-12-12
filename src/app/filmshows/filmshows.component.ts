import { Component, OnInit } from '@angular/core';
import { FilmshowService } from '../_services/filmshow.service';
import { HallService } from '../_services/hall.service';
import { FilmService } from '../_services/film.service';
import { Filmshow } from '../models/Filmshow';
import { Film } from '../models/Film';
import { Hall } from '../models/Hall';

@Component({
  selector: 'app-filmshows',
  templateUrl: './filmshows.component.html',
  styleUrls: ['./filmshows.component.css']
})
export class FilmshowsComponent implements OnInit {
  filmshows = new Array<Filmshow>();
  films = new Array<Film>();
  halls = new Array<Hall>();
  time: any;
  date: any;
  editMode: boolean;
  filmshowToAdd = new Filmshow();

  constructor(private filmshowService: FilmshowService, private filmService: FilmService, private hallService: HallService) { }

  ngOnInit() {
    this.getFilmshows();
    this.getHalls();
    this.getFilms();
  }

  getHalls() {
    this.hallService.getHalls().subscribe(response => {
      this.halls = response;
    }, error => {
      console.log('Unable to get halls');
    });
  }

  getFilms() {
    this.filmService.getFilms().subscribe(response => {
      this.films = response;
    }, error => {
      console.log('Unable to get films');
    });
  }

  getFilmshows() {
    this.filmshowService.getFilmshows().subscribe(response => {
      this.filmshows = response;
    }, error => {
      console.log('Unable to get filmshows');
    });
  }

  addFilmshow() {

    const newDate = new Date();
    newDate.setUTCHours(this.time.hour, this.time.minute);
    newDate.setUTCFullYear(this.date.year, this.date.month - 1, this.date.day);
    this.filmshowToAdd.filmshowTime = newDate;

    this.filmshowService.addFilmshow(this.filmshowToAdd).subscribe(() => {
      console.log('Filmshow added');
    }, error => {
      console.log(error);
    });
  }

  delete(filmshowId: any) {
    this.filmshowService.deleteFilmshow(filmshowId).subscribe(() => {
      console.log('Filmshow deleted');
    }, error => {
      console.log(error);
    });
  }

  prepareEdit(filmshowId: any, filmshowDate: any, filmId: string, hallId: string) {
    const filmshowDatetmp = new Date(filmshowDate);
    this.editMode = true;
    this.filmshowToAdd.filmshowId = filmshowId;
    this.filmshowToAdd.filmId = filmId;
    this.filmshowToAdd.hallId = hallId;
    console.log(filmshowDatetmp);
    this.date =  {year: filmshowDatetmp.getUTCFullYear(), month: filmshowDatetmp.getUTCMonth() + 1, day: filmshowDatetmp.getDate()};
    this.time = {hour: filmshowDatetmp.getHours(), minute: filmshowDatetmp.getMinutes()};
  }

  edit() {
    const newDate = new Date();
    console.log(this.date);
    newDate.setUTCHours(this.time.hour, this.time.minute);
    newDate.setUTCFullYear(this.date.year, this.date.month - 1, this.date.day);
    this.filmshowToAdd.filmshowTime = newDate;

    this.filmshowService.editFilmshow(this.filmshowToAdd).subscribe(() => {
      console.log('Filmshow edited');
    // this.getFilms(); TO REFRESH
    }, error => {
      console.log(error);
    });
  }
}
