import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { AuthService } from '../_services/auth.service';
import { Seat } from '../models/Seat';
import { Filmshow } from '../models/Filmshow';
import { Hall } from '../models/Hall';
import { Ticket } from '../models/Ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
ticketListToAdd: Array<Ticket>;
message: any[];
seats = new Array<Seat>();
filmshow = new Filmshow();
hall = new Hall();
userName: string;

  constructor(private data: DataService, private auth: AuthService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.seats = this.message[0];
    this.filmshow = this.message[1];
    this.hall = this.message[2];
    this.userName = this.auth.getUserName();
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
