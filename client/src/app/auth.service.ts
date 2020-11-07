import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connectedSubject = new Subject<boolean>();
  connected = false;

  constructor() { }

  emitConnectedSubject() {
    this.connectedSubject.next(this.connected)
  }

  connection() {
    this.connected = true;
    this.emitConnectedSubject();
  }
}
