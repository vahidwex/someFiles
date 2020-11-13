import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';
import { PusherService } from './pusher.service';

export interface PushMessage {
  session_id: any;
  user_id: any;
  message: any;
  sender_id: any;
  created_at: any;
}

@Injectable()
export class PushMessageService {

  messagesStream = new ReplaySubject<PushMessage>(1);

  constructor(private pusherService: PusherService) {
    this.initialize();
  }

  public initialize() {
    this.pusherService.messagesChannel.bind('new-message', (message) => {
      this.emitNewMessage(message);
    });
  }

  public send(message: PushMessage) {
    this.pusherService.messagesChannel.trigger('new-message', message);
    this.emitNewMessage(message);
  }

  public emitNewMessage(message: PushMessage) {
    this.messagesStream.next(message);
  }

}
