import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private messagesource = new BehaviorSubject([]);
  receiveData = this.messagesource.asObservable();

  constructor() { }

  sendData(message: any) {
    this.messagesource.next(message)
  }
}
