import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:5001/Users/';
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(userLoginData: any) {
    return this.http.post(this.baseUrl + 'login', userLoginData).pipe(
      map((response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  register(userRegisterData: any) {
    return this.http.post(this.baseUrl + 'register', userRegisterData);
  }

  getUserName() {
    return this.jwtHelper.decodeToken(localStorage.getItem('token')).unique_name;
  }

  getUserId() {
    return this.jwtHelper.decodeToken(localStorage.getItem('token')).nameid;
  }

  getUserRole() {
    return this.jwtHelper.decodeToken(localStorage.getItem('token')).role;
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  isEmployee() {
    const role = this.jwtHelper.decodeToken(localStorage.getItem('token')).role;
    if (role === 'employee') {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out');
  }
}
