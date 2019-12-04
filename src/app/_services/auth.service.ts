import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:5001/Users/';

  constructor(private http: HttpClient) {}

  login(userLoginData: any) {
    return this.http.post(this.baseUrl + 'login', userLoginData).pipe(
      map((response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
        }
      })
    );
  }

  register(userRegisterData: any) {
    return this.http.post(this.baseUrl + 'register', userRegisterData);
  }
}
