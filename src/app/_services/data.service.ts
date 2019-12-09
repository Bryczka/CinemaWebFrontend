import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private messageSource = new BehaviorSubject<any[]>([]);
currentMessage = this.messageSource.asObservable();

constructor() { }

changeMessage(message: any) {
  this.messageSource.next(message);
}
}
