import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:5001/Users/';
  helper = new JwtHelperService();
  constructor(private http: HttpClient) {}

  login(userLoginData: any) {
    return this.http.post(this.baseUrl + 'login', userLoginData).pipe(
      map((response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', this.helper.decodeToken(response.token).role);
        }
      })
    );
  }

  register(userRegisterData: any) {
    return this.http.post(this.baseUrl + 'register', userRegisterData);
  }

  getUserName() {
    return this.helper.decodeToken(localStorage.getItem('token')).unique_name;
  }

  getUserId() {
    return this.helper.decodeToken(localStorage.getItem('token')).nameid;
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
}
