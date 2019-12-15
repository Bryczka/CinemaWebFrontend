import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../models/Ticket';
import { Seat } from '../models/Seat';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
baseUrl = 'https://localhost:5001/Tickets/';

constructor(private http: HttpClient) { }

addTickets(tickets: Array<Ticket>) {
  return this.http.post(this.baseUrl, tickets);
}

bookSeats(seats: Array<Seat>) {
  return this.http.put(this.baseUrl + 'seats', seats);
}

getUserTickets(userId: string) {
  return this.http.get<Array<Ticket>>(this.baseUrl + 'tickets/' + userId);
}

getCurrentUserTickets(userId: string) {
  return this.http.get<Array<Ticket>>(this.baseUrl + 'tickets/filter/' + userId);
}

getFilmshowTickets(filmshowId: string) {
  return this.http.get<Array<Ticket>>(this.baseUrl + 'tickets/filmshow/' + filmshowId);
}

}
