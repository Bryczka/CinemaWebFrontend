import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from '../models/Film';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  baseUrl = 'https://localhost:5001/Films/';

  constructor(private http: HttpClient) { }

  getFilms(): Observable<Array<Film>> {
    return this.http.get<Array<Film>>(this.baseUrl);
  }

  addFilm(film: Film) {
    return this.http.post(this.baseUrl, film);
  }

  deleteFilm(filmId: string) {
    return this.http.delete(this.baseUrl + 'film/' + filmId);
  }

  editFilm(film: Film) {
    return this.http.put(this.baseUrl + 'film', film);

  }

  getFilm(filmId: string): Observable<Film> {
    return this.http.get<Film>(this.baseUrl + 'film/' + filmId);
  }
}
