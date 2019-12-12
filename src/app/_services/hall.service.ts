import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hall } from '../models/Hall';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  baseUrl = 'https://localhost:5001/Halls/';

  constructor(private http: HttpClient) { }

  getHalls(): Observable<Array<Hall>> {
    return this.http.get<Array<Hall>>(this.baseUrl);
  }

  addHall(hall: Hall) {
    return this.http.post(this.baseUrl, hall);
  }

  deleteHall(hallId: string) {
    return this.http.delete(this.baseUrl + 'hall/' + hallId);
  }

  getHall(hallId: string): Observable<Hall> {
    return this.http.get<Hall>(this.baseUrl + hallId);
  }

  getHallOfFilmshow(hallId: string, filmshowId: string): Observable<Hall> {
    return this.http.get<Hall>(this.baseUrl + hallId + '/' + filmshowId);
  }

}
