import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';

declare const Pusher: any;

@Injectable()
export class PusherService {
  pusher: any;
  messagesChannel: any;

  constructor(private authService: AuthService) {
    this.initializePusher();
  }

  public initializePusher(): void {

    this.pusher = new Pusher('7945707954ffa29cdca1', {
        cluster: 'us2',
        forceTLS: true,
        logToConsole: true
      });
    const channel = 'channel-' + this.authService.getUserId();
    this.messagesChannel = this.pusher.subscribe(channel);
  }
}
