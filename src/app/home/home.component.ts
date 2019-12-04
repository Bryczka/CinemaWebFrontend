import { Component, OnInit } from '@angular/core';
import { FilmService } from '../_services/film.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  films: any;

  constructor(private filmService: FilmService) {}

  ngOnInit() {
    this.getFilms();
  }

  getFilms() {
    this.filmService.getFilms().subscribe(response => {
      this.films = response;
    }, error => {
      console.log('Unable to get films');
    });
  }
}
