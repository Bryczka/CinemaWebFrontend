import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../_services/film.service';
import { FilmshowService } from '../_services/filmshow.service';
import { HallService } from '../_services/hall.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/_services/data.service';
import { Film } from 'src/app/models/Film';
import { Hall } from 'src/app/models/Hall';
import { Filmshow } from 'src/app/models/Filmshow';
import { Seat } from 'src/app/models/Seat';
import { Ticket } from '../models/Ticket';
import { TicketService } from '../_services/ticket.service';
import { exists } from 'fs';

@Component({
  selector: 'app-films-detailed',
  templateUrl: './filmsDetailed.component.html',
  styleUrls: ['./filmsDetailed.component.css']
})
export class FilmsDetailedComponent implements OnInit {
  film: Film;
  selectedFilmshowHall: Hall;
  selectedFilmshow: Filmshow;
  rowsTable: any;
  seatsNumber: any;
  seats: Array<Seat>;
  filmshows: Array<Filmshow>;
  currentDate: Date;
  selectedSeats = new Array<Seat>();
  el: HTMLElement;
  message: any;
  tickets = new Array<Ticket>();

  constructor(private route: ActivatedRoute, private filmshowService: FilmshowService,
              private filmService: FilmService, private hallService: HallService, private modalService: NgbModal,
              private data: DataService, private ticketService: TicketService) {}

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.film = this.message;
    this.getFilmshows(this.film.filmId);
  }

  // getFilmshowTickets(filmshowId: string) {
  //   this.ticketService.getFilmshowTickets(filmshowId).subscribe(response => {
  //     this.tickets = response;
  //     console.log(this.tickets);
  //   }, error => {
  //     console.log('Unable to get films');
  //   });
  // }

  openModal(template: TemplateRef<any>, hallId: any, selectedFilmshow: any) {
    this.hallService.getHallOfFilmshow(hallId, selectedFilmshow.filmshowId).subscribe(response => {
      this.selectedFilmshowHall = response;
      this.rowsTable = Array(this.selectedFilmshowHall.rowsNumber);
      this.seatsNumber = Array(this.selectedFilmshowHall.seatsInRowNumber);
      this.seats = this.selectedFilmshowHall.seats;
    }, error => {
      console.log('Unable to get hall');
    });
    this.selectedFilmshow = selectedFilmshow;
    //this.getFilmshowTickets(this.selectedFilmshow.filmshowId);
    this.modalService.open(template, {size: 'xl'});
  }

  getFilm(filmId: any) {
    this.filmService.getFilm(filmId).subscribe(response => {
      this.film = response;
    }, error => {
      console.log('Unable to get films');
    });
  }

  getFilmshows(filmId: any) {
    this.filmshowService.getFilmshowsOfFilm(filmId).subscribe(response => {
      this.filmshows = response;
    }, error => {
      console.log('Unable to get films');
    });
  }

  getCurrentDate(index: any) {
    this.currentDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate() + index);
    return this.currentDate;
  }

  compareDates(selectedDate: Date,  filmshowDate: Date) {
    const selectedDatetmp = new Date(selectedDate).toDateString();
    const filmshowDatetmp = new Date(filmshowDate).toDateString();
    if (filmshowDatetmp === selectedDatetmp) {
      return true;
    }
  }

  clickSeat(seat: Seat) {
    this.el = document.getElementById(seat.seatId);
    if (this.el.style.backgroundColor === 'red') {
      this.el.style.backgroundColor = 'darkgray';
      this.selectedSeats = this.selectedSeats.filter(item => item !== seat);
    } else {
      this.el.style.backgroundColor = 'red';
      this.selectedSeats.push(seat);
      this.selectedSeats = this.selectedSeats.filter(() => true);
    }
  }

  prepareTicketData() {
    const data = [this.selectedSeats, this.selectedFilmshow, this.selectedFilmshowHall];
    this.data.changeMessage(data);
  }

  // isSeatOccupied(seat: Seat) {
  //   console.log(this.tickets.filter(item => item.rowNumber !== seat.row && item.seatNumber !== seat.seatNumber));
  //   if (!this.tickets.filter(item => item.rowNumber !== seat.row && item.seatNumber !== seat.seatNumber)) { return false; }

  // }
}
