import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filmshow } from '../models/Filmshow';

@Injectable({
  providedIn: 'root'
})
export class FilmshowService {
  baseUrl = 'https://localhost:5001/Filmshows/';

  constructor(private http: HttpClient) { }


  getFilmshows(): Observable<Array<Filmshow>> {
    return this.http.get<Array<Filmshow>>(this.baseUrl);
  }

  addFilmshow(filmshow: Filmshow) {
    return this.http.post(this.baseUrl, filmshow);
  }

  deleteFilmshow(filmshowId: string) {
    return this.http.delete(this.baseUrl + 'filmshow/' + filmshowId);
  }

  editFilmshow(filmshow: Filmshow) {
    return this.http.put(this.baseUrl + 'filmshow', filmshow);

  }

  getFilmshowsOfFilm(filmId: string): Observable<Array<Filmshow>> {
    return this.http.get<Array<Filmshow>>(this.baseUrl + 'filmshow/film/' + filmId);
  }
}
