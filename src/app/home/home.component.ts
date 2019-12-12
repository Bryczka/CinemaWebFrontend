import { Component, OnInit } from '@angular/core';
import { FilmService } from '../_services/film.service';
import { Film } from '../models/Film';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  films: Array<Film>;

  constructor(private filmService: FilmService) {}

  ngOnInit() {
    this.getFilms();
  }

  getFilms() {
    this.filmService.getFilms().subscribe(response => {
      this.films = response;
      console.log(this.films);
    }, error => {
      console.log('Unable to get films');
    });
  }
}
