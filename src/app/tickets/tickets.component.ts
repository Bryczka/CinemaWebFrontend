import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
ticketListToAdd: any[] = [{}];
message: any[];
seats: any[];
filmshow: any;
hall: any;
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
