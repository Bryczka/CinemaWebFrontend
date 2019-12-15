import { Component, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../_services/auth.service';
import { TicketService } from '../_services/ticket.service';
import { Ticket } from '../models/Ticket';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.css']
})
export class UserTicketsComponent implements OnInit {
  ticketList: Array<Ticket>;
  currentTickets: boolean;

  constructor(private auth: AuthService, private ticketService: TicketService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getCurrentUserTickets();
  }

  getCurrentUserTickets() {
    this.currentTickets = true;
    this.ticketService.getCurrentUserTickets(this.auth.getUserId()).subscribe(response => {
      this.ticketList = response;
    }, error => {
      this.alertify.error('Can not get tickets');
    });
  }

  getUserTickets() {
    this.currentTickets = false;
    this.ticketService.getUserTickets(this.auth.getUserId()).subscribe(response => {
      this.ticketList = response;
    }, error => {
      this.alertify.error('Can not get tickets');
    });
  }

}
