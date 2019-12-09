import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
baseUrl = 'https://localhost:5001/Tickets/';

constructor(private http: HttpClient) { }

addTickets(ticketsData: any) {
  return this.http.post(this.baseUrl, ticketsData);
}

}
