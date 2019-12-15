import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../models/User';

@Component({
  selector: 'app-set-employees',
  templateUrl: './set-employees.component.html',
  styleUrls: ['./set-employees.component.css']
})
export class SetEmployeesComponent implements OnInit {
users: Array<User>;
  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getUsers();
  }

getUsers() {
  this.userService.getUsers().subscribe(response => {
    this.users = response;
    console.log(this.users);
  }, error => {
    this.alertify.error('Can not get users');
  });
}

  setEmployee(user: User) {
    if (confirm('Are you sure to set user as employee?')) {
      this.userService.setEmployee(user).subscribe(() => {
        this.alertify.success('Employee added');
        this.getUsers();
      }, error => {
        this.alertify.error('Can not set as employee');
      });
    }
  }

  setUser(user: User) {
    if (confirm('Are you sure to set employee as user?')) {
      this.userService.setUser(user).subscribe(() => {
        this.alertify.success('User added');
        this.getUsers();
      }, error => {
        this.alertify.error('Can not set as user');
      });
    }
  }
}
