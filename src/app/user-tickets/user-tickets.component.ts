import { Component, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../_services/auth.service';
import { TicketService } from '../_services/ticket.service';
import { Ticket } from '../models/Ticket';

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.css']
})
export class UserTicketsComponent implements OnInit {
  ticketList: Array<Ticket>;
  constructor(private auth: AuthService, private ticketService: TicketService) { }

  ngOnInit() {
    this.getUserTickets();
  }

  getUserTickets() {
    this.ticketService.getUserTickets(this.auth.getUserId()).subscribe(response => {
      this.ticketList = response;
      console.log(this.ticketList);
    }, error => {
      console.log('Unable to get films');
    });
  }

}
