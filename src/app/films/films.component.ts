import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FilmService } from '../_services/film.service';
import { Film } from '../models/Film';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films = new Array<Film>();
  filmToAdd = new Film();
  editMode: boolean;
  url: any = '../assets/images/no-image.jpg';

  constructor(private filmService: FilmService) { }

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

  addFilm() {
    this.filmToAdd.imageBase64 = this.url;
    this.filmService.addFilm(this.filmToAdd).subscribe(() => {
      console.log('Film added');
      this.getFilms();
    }, error => {
      console.log(error);
    });
  }

  prepareEdit(filmId: any, filmTitle: any, filmCategory: any, filmLength: any, filmRating: any, filmDescription: any, filmImage: any) {
    this.editMode = true;
    this.filmToAdd.filmId = filmId;
    this.filmToAdd.title = filmTitle;
    this.filmToAdd.category = filmCategory;
    this.filmToAdd.length = filmLength;
    this.filmToAdd.rating = filmRating;
    this.filmToAdd.description = filmDescription;
    this.url = 'data:image/png;base64,' + filmImage;
  }

  edit() {
    this.filmService.editFilm(this.filmToAdd).subscribe(() => {
      console.log('Film edited');
      this.getFilms();
    }, error => {
      console.log(error);
    });
  }

  delete(filmId: any) {
    this.filmService.deleteFilm(filmId).subscribe(() => {
      console.log('Film deleted');
      this.getFilms();
    }, error => {
      console.log(error);
    });
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (loaded: any) => {
        this.url = loaded.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
