import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLoginData: any = {};
  constructor(private authService: AuthService) { }

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

  cancel() {
    console.log('Canceled register');
  }

}
