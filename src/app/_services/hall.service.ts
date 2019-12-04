import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  baseUrl = 'https://localhost:5001/Halls/';

  constructor(private http: HttpClient) { }

  getHalls() {
    return this.http.get(this.baseUrl);
  }

  addHall(hallData: any) {
    return this.http.post(this.baseUrl, hallData);
  }

  deleteHall(hallId: any) {
    return this.http.delete(this.baseUrl + 'hall/' + hallId);
  }

}
