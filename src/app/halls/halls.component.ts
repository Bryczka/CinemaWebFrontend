import { Component, OnInit } from '@angular/core';
import { HallService } from '../_services/hall.service';
import { NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.css']
})
export class HallsComponent implements OnInit {
  halls: any;
  hallToAdd: any = {};

  constructor(private hallService: HallService) { }

  ngOnInit() {
    this.getHalls();
  }

  getHalls() {
    this.hallService.getHalls().subscribe(response => {
      this.halls = response;
    }, error => {
      console.log('Unable to get halls');
    });
  }

  addHall() {
    this.hallService.addHall(this.hallToAdd).subscribe(() => {
      console.log('Hall added');
    }, error => {
      console.log(error);
    });
  }

  delete(hallId: any) {
    this.hallService.deleteHall(hallId).subscribe(() => {
      console.log('Hall deleted');
    }, error => {
      console.log(error);
    });
  }

}
