import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  baseUrl = 'https://localhost:5001/Films/';

  constructor(private http: HttpClient) { }

  getFilms() {
    return this.http.get(this.baseUrl);
  }

  addFilm(filmData: any) {
    return this.http.post(this.baseUrl, filmData);
  }

  deleteFilm(filmId: any) {
    return this.http.delete(this.baseUrl + 'film/' + filmId);
  }

  editFilm(filmData: any) {
    return this.http.put(this.baseUrl + 'film', filmData);

  }
}
