import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../_services/data.service';
import { TicketService } from '../_services/ticket.service';
import { AuthService } from '../_services/auth.service';
import { Ticket } from '../models/Ticket';
import { Filmshow } from '../models/Filmshow';
import { Seat } from '../models/Seat';
import { MatDialog } from '@angular/material';
import { NavigateTicketsComponent } from '../_modals/navigate-tickets/navigate-tickets.component';
import { TicketsComponent } from '../tickets/tickets.component';
import { AlertifyService } from '../_services/alertify.service';


declare var paypal;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  cost = 10.00;
  message: any[];
  seats = new Array<Seat>();
  filmshow = new Filmshow();
  bill: any;
  paidFor = false;
  tickets = new Array<Ticket>();

  constructor(private data: DataService, private ticketsComponent: TicketsComponent,
              private ticketService: TicketService, private auth: AuthService, private matDialog: MatDialog,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.bill = this.message[0].length * this.cost;
    this.seats = this.message[0];
    this.filmshow = this.message[1];
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: this.bill
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          this.addTickets();
          this.openModal();
          this.ticketsComponent.paymentCompleted = true;
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }

  createTickets() {
    for (let i = 0; i < this.seats.length; i++) {
      const ticket = new Ticket();
      ticket.seatNumber = this.seats[i].seatNumber;
      ticket.rowNumber = this.seats[i].row;
      ticket.isPaid = true;
      ticket.userId = this.auth.getUserId();
      ticket.filmshowId = this.filmshow.filmshowId;

      this.tickets.push(ticket);
      }
    return this.tickets;
    }

  addTickets() {
    this.ticketService.addTickets(this.createTickets()).subscribe(() => {
    }, error => {
      this.alertify.error('Can not add tickets');
    });
  }
  openModal() {
    this.matDialog.open(NavigateTicketsComponent);
  }
}
