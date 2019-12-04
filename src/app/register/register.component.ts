import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRegisterData: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    console.log(this.userRegisterData);
    this.authService.register(this.userRegisterData).subscribe(() => {
      console.log('Registered');
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    console.log('Canceled register');
  }
}
