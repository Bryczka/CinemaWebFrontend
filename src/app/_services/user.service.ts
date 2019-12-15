import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://localhost:5001/Users/';
constructor(private http: HttpClient) { }

setEmployee(user: User) {
  return this.http.put(this.baseUrl + 'setEmployee', user);
}

setUser(user: User) {
  return this.http.put(this.baseUrl + 'setUser', user);
}

getUsers(): Observable<Array<User>> {
  return this.http.get<Array<User>>(this.baseUrl);
}

}
