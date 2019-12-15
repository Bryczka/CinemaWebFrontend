import { Component, OnInit } from '@angular/core';
import { FilmshowService } from '../_services/filmshow.service';
import { HallService } from '../_services/hall.service';
import { FilmService } from '../_services/film.service';
import { Filmshow } from '../models/Filmshow';
import { Film } from '../models/Film';
import { Hall } from '../models/Hall';
import { AlertifyService } from '../_services/alertify.service';

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

  constructor(private filmshowService: FilmshowService, private filmService: FilmService,
              private hallService: HallService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getFilmshows();
    this.getHalls();
    this.getFilms();
  }

  getHalls() {
    this.hallService.getHalls().subscribe(response => {
      this.halls = response;
    }, error => {
      this.alertify.error('Can not get halls');
    });
  }

  getFilms() {
    this.filmService.getFilms().subscribe(response => {
      this.films = response;
    }, error => {
      this.alertify.error('Can not get films');
    });
  }

  getFilmshows() {
    this.filmshowService.getFilmshows().subscribe(response => {
      this.filmshows = response;
    }, error => {
      this.alertify.error('Can not get filmshows');
    });
  }

  addFilmshow() {

    const newDate = new Date();
    newDate.setUTCHours(this.time.hour, this.time.minute);
    newDate.setUTCFullYear(this.date.year, this.date.month - 1, this.date.day);
    this.filmshowToAdd.filmshowTime = newDate;

    this.filmshowService.addFilmshow(this.filmshowToAdd).subscribe(() => {
      this.alertify.success('Filmshow added!');
      this.resetAndReload();
    }, error => {
      this.alertify.error('Can not add filmshow');
    });
  }

  delete(filmshowId: any) {
    if (confirm('Are you sure to delete filmshow?')) {
    this.filmshowService.deleteFilmshow(filmshowId).subscribe(() => {
      this.alertify.success('Filmshow deleted');
      this.resetAndReload();
    }, error => {
      this.alertify.error('Can not delete filmshow');
    });
  }
  }

  prepareEdit(filmshowId: any, filmshowDate: any, filmId: string, hallId: string) {
    const filmshowDatetmp = new Date(filmshowDate);
    this.editMode = true;
    this.filmshowToAdd.filmshowId = filmshowId;
    this.filmshowToAdd.filmId = filmId;
    this.filmshowToAdd.hallId = hallId;
    this.date =  {year: filmshowDatetmp.getUTCFullYear(), month: filmshowDatetmp.getUTCMonth() + 1, day: filmshowDatetmp.getDate()};
    this.time = {hour: filmshowDatetmp.getHours(), minute: filmshowDatetmp.getMinutes()};
  }

  edit() {
    if (confirm('Are you sure to edit filmshow?')) {
    const newDate = new Date();
    console.log(this.date);
    newDate.setUTCHours(this.time.hour, this.time.minute);
    newDate.setUTCFullYear(this.date.year, this.date.month - 1, this.date.day);
    this.filmshowToAdd.filmshowTime = newDate;
    this.filmshowService.editFilmshow(this.filmshowToAdd).subscribe(() => {
      this.alertify.success('Filmshow edited!');
      this.resetAndReload();
    }, error => {
      this.alertify.error('Can not edit filmshow');
    });
  }
  }

  resetAndReload() {
    this.getFilmshows();
    this.getHalls();
    this.getFilms();
    this.editMode = false;
}
}
