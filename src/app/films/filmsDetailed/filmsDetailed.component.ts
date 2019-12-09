import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FilmService } from '../../_services/film.service';
import { FilmshowService } from '../../_services/filmshow.service';
import { HallService } from '../../_services/hall.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-filmsDetailed',
  templateUrl: './filmsDetailed.component.html',
  styleUrls: ['./filmsDetailed.component.css']
})
export class FilmsDetailedComponent implements OnInit {
  param: any;
  film: any = {};
  selectedFilmshowHall: any = {};
  selectedFilmshow: any = {};
  rowsTable: any;
  seatsNumber: any;
  seats: any;
  filmshows: any;
  currentDate: Date;
  selectedSeats: any[] = [];
  el: HTMLElement;
  message: any[];

  constructor(private route: ActivatedRoute, private filmshowService: FilmshowService,
              private filmService: FilmService, private hallService: HallService, private modalService: NgbModal,
              private data: DataService) {}

  ngOnInit() {
    this.route.paramMap.forEach(({ params }: Params) => {
      this.param = params.id;
      console.log(this.param);
    });
    this.getFilm(this.param);
    this.getFilmshows(this.param);
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  openModal(template: TemplateRef<any>, hallId: any, selectedFilmshow: any) {
    this.hallService.getHall(hallId).subscribe(response => {
      this.selectedFilmshowHall = response;
      this.rowsTable = Array(this.selectedFilmshowHall.rowsNumber);
      this.seatsNumber = Array(this.selectedFilmshowHall.seatsInRowNumber);
      this.seats = this.selectedFilmshowHall.seats;
    }, error => {
      console.log('Unable to get hall');
    });
    this.selectedFilmshow = selectedFilmshow;
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

  clickSeat(seat: any) {
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
}
