import { Component, OnInit } from '@angular/core';
import { HallService } from '../_services/hall.service';
import { NgModel, NgForm } from '@angular/forms';
import { Hall } from '../models/Hall';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.css']
})
export class HallsComponent implements OnInit {
  halls = new Array<Hall>();
  hallToAdd = new Hall();

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
      this.resetAndReload();
    }, error => {
      console.log(error);
    });
  }

  delete(hallId: any) {
    this.hallService.deleteHall(hallId).subscribe(() => {
      console.log('Hall deleted');
      this.resetAndReload();
    }, error => {
      console.log(error);
    });
  }

  resetAndReload() {
    this.hallToAdd = new Hall();
    this.getHalls();
}

}
