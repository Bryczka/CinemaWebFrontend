import { Component, OnInit } from '@angular/core';
import { FilmService } from '../_services/film.service';
import { Film } from '../models/Film';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  films: Array<Film>;
  message: any;
  selectedFilm = new Film();

  constructor(private filmService: FilmService, private data: DataService) {}

  ngOnInit() {
    this.getFilms();
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  getFilms() {
    this.filmService.getFilms().subscribe(response => {
      this.films = response;
      console.log(this.films);
    }, error => {
      console.log('Unable to get films');
    });
  }

  chooseFilm(selectedFilm: Film) {
    const data = selectedFilm;
    this.data.changeMessage(data);
  }
}
