import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmshowService {
  baseUrl = 'https://localhost:5001/Filmshows/';

  constructor(private http: HttpClient) { }


  getFilmshows() {
    return this.http.get(this.baseUrl);
  }

  addFilmshow(filmshowData: any) {
    return this.http.post(this.baseUrl, filmshowData);
  }

  deleteFilmshow(filmshowId: any) {
    return this.http.delete(this.baseUrl + 'filmshow/' + filmshowId);
  }

  editFilmshow(filmshowData: any) {
    return this.http.put(this.baseUrl + 'filmshow', filmshowData);

  }
}
