import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../_services/data.service';
import { AuthService } from '../_services/auth.service';
import { Seat } from '../models/Seat';
import { Filmshow } from '../models/Filmshow';
import { Hall } from '../models/Hall';
import { Ticket } from '../models/Ticket';
import { TicketService } from '../_services/ticket.service';
import { MatDialog } from '@angular/material';
import { NavigateTicketsComponent } from '../_modals/navigate-tickets/navigate-tickets.component';

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
tickets = new Array<Ticket>();
public paymentCompleted: boolean;

  constructor(private data: DataService, private auth: AuthService, private ticketService: TicketService,
              private matDialog: MatDialog) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.seats = this.message[0];
    this.filmshow = this.message[1];
    this.hall = this.message[2];
    this.userName = this.auth.getUserName();
  }

  loggedIn() {
   return this.auth.loggedIn();
  }

  createTickets() {
    for (let i = 0; i < this.seats.length; i++) {
      const ticket = new Ticket();
      ticket.seatNumber = this.seats[i].seatNumber;
      ticket.rowNumber = this.seats[i].row;
      ticket.isPaid = false;
      ticket.userId = this.auth.getUserId();
      ticket.filmshowId = this.filmshow.filmshowId;
      this.tickets.push(ticket);
      }
    return this.tickets;
    }

  addTickets() {
    this.ticketService.addTickets(this.createTickets()).subscribe(() => {
      console.log('Tickets added');
      this.openModal();
      this.paymentCompleted = true;
    }, error => {
      console.log(error);
    });
  }

  openModal() {
    this.matDialog.open(NavigateTicketsComponent);
  }
}
