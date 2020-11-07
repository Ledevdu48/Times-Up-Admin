import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  socket: any;

  connectedSubscription : Subscription;
  isAuth: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.connectedSubscription = this.authService.connectedSubject.subscribe(
      (connected) => {
        this.isAuth = connected;
      }
    );
    this.authService.emitConnectedSubject();

    this.socket = io.connect('http://89.33.6.104:3000'); 
  }
  
}
