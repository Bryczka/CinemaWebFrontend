import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginData: any = {};
  dialogConfig: MatDialogConfig;
  constructor(private authService: AuthService, private matDialog: MatDialog) { }

  ngOnInit() {

  }

  login() {
    console.log(this.authService.login(this.userLoginData));
    this.authService.login(this.userLoginData).subscribe(next => {
      console.log('Logged in successfully');
    }, error => {
      console.log('Failed to login');
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    console.log('Logged out');
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  isEmployee() {
    const role = localStorage.getItem('role');
    if (role === 'employee') {
      return true;
    }
    return false;
  }

  openModal() {
    this.matDialog.open(RegisterComponent,  {
      height: '80%',
      width: '40%'
    });
  }
}
