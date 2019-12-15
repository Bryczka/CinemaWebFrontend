import { Component, OnInit } from '@angular/core';
import { HallService } from '../_services/hall.service';
import { NgModel, NgForm } from '@angular/forms';
import { Hall } from '../models/Hall';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.css']
})
export class HallsComponent implements OnInit {
  halls = new Array<Hall>();
  hallToAdd = new Hall();

  constructor(private hallService: HallService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getHalls();
  }

  getHalls() {
    this.hallService.getHalls().subscribe(response => {
      this.halls = response;
    }, error => {
      this.alertify.error('Can not get halls');
    });
  }

  addHall() {
    this.hallService.addHall(this.hallToAdd).subscribe(() => {
      this.alertify.success('Hall added!');
      this.resetAndReload();
    }, error => {
      this.alertify.error('Can not delete hall');
    });
  }

  delete(hallId: any) {
    if (confirm('Are you sure to delete hall?')) {
    this.hallService.deleteHall(hallId).subscribe(() => {
      this.alertify.success('Hall deleted');
      this.resetAndReload();
    }, error => {
      this.alertify.error('Can not delete hall');
    });
  }
  }

  resetAndReload() {
    this.hallToAdd = new Hall();
    this.getHalls();
}

}
