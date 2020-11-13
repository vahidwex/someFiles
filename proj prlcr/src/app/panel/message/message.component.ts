import {Component, OnInit,PLATFORM_ID,Inject} from '@angular/core';
import {AlertService} from '../../tools/alert.service';
import {MetaService} from '../../tools/meta.service';
import {ApiService} from '../../Services/Api.Service';
import {HelperFunction} from '../../tools/helper-function';
import { isPlatformBrowser } from "@angular/common";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AuthService} from '../../tools/auth-service';
import {PushMessage} from '../../tools/PushMessage.service';
import {PushMessageService} from '../../tools/PushMessage.service';
import {PusherService} from '../../tools/pusher.service';

@Component({
  selector: 'app-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  public sessionChats = [];
  public newMessageCounter = [];
  public channelSessionName = '';
  public channelSessionId = '';
  public myUserId = this.authService.getUserId();
  public message: string;

  messages: Array<PushMessage>;

  private newMessageEventHandler(event: PushMessage): void {
    // //console.log('newMessageEventHandler', this.channelSessionId, event.session_id);
    if (event) {
      if (this.channelSessionId == event.session_id) {
        this.messages.push(event);
        setTimeout(() => {
          document.getElementById('messageScroll').scrollTop = document.getElementById('messageScroll').scrollHeight;
        }, 500);
      } else {
        if (this.newMessageCounter[event.session_id] != null) {
          this.newMessageCounter[event.session_id] = this.newMessageCounter[event.session_id] + 1;
        } else {
          this.newMessageCounter[event.session_id] = 1;
        }

      }
    }

  }

  constructor(private router: Router,
              private authService: AuthService,
              private service: ApiService,
              private helper: HelperFunction,
              @Inject(PLATFORM_ID) private platformId: Object,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private metaService: MetaService,
              private pusherService: PusherService,
              private messageService: PushMessageService) {
    this.messages = [];
  }

  /**
   * ngOnInit()
   */

  public ngOnInit() {
    if ( isPlatformBrowser(this.platformId) ) {
      this.user = this.authService.getUser();
      //console.log(this.user.role);
      let queryParam = this.route.snapshot.queryParamMap;
      this.project_id = queryParam.get('project_id') ? queryParam.get('project_id') : 0;
      window.scrollTo(0, 0);
      this.metaService.setTitle('Send a Message to client/freelancer');
      this.metaService.setDescription('Connect easily with the clients or freelancers to discuss the job details and proceed with the hiring. The job you want to hire a professional for needs to be discussed and we give you that opportunity.');
      this.messageService.messagesStream
        .subscribe(this.newMessageEventHandler.bind(this));
      this.LIVECHAT_SESSIONS_USER();
    }
  }

  public LIVECHAT_USER_SESSIONS(channel) {
    this.service
      .LIVECHAT_USER_SESSIONS(channel)
      .subscribe(
        res => {
          if (res) {
            //console.log(res);
          }
        },
        err => {
          console.error(err);
          this.alertService.alertError('Internal Server Error');
        }
      );
  }
  public project_id : any = 0;
  public channelProjectId = 0;

  public LIVECHAT_HISTORY(channel) {
    this.newMessageCounter[channel.id] = null;
    this.channelSessionName = channel.session_name;
    this.channelSessionId = channel.id;
    this.channelProjectId = channel.project_id;
    this.service
      .LIVECHAT_HISTORY(channel.id)
      .subscribe(
        res => {
          if (res) {
            //console.log(res);
            this.messages = res.data;
            scroll();
          }
        },
        err => {
          console.error(err);
          this.alertService.alertError('Internal Server Error');
        }
      );
  }

  public LIVECHAT_SESSIONS_USER() {
    this.service
      .LIVECHAT_SESSIONS_USER(this.authService.getUserId())
      .subscribe(
        res => {
          if (res) {
            //console.log(res);
            this.sessionChats = res;
            if(this.project_id != 0){
              this.sessionChats.forEach(element => {
                if(element.project_id == this.project_id){
                  this.LIVECHAT_HISTORY(element);
                }
              });
            }
          }
        },
        err => {
          console.error(err);
          this.alertService.alertError('Internal Server Error');
        }
      );
  }

  public onKeyDown(e,payload){
    //console.log(e);
    if(e.key === "Enter") {
      this.LIVECHAT_SEND(payload);
    }
  }

  public user ;

  public LIVECHAT_SEND(payload) {
    if(payload == ''){
      return;
    }
    if (payload) {
      const sendMessage = {
        user_id: this.authService.getUserId(),
        message: payload
      };
      this.message = '';
      const current = new Date();
      const timestamp = current.getTime();
      //console.log(timestamp);

      this.service
        .LIVECHAT_SEND(this.channelSessionId, sendMessage)
        .subscribe(
          res => {
            if (res) {
              this.messageService.messagesStream.next({
                user_id: this.authService.getUserId(),
                message: payload,
                sender_id: this.authService.getUserId(),
                session_id: this.channelSessionId,
                created_at: timestamp / 1000
              });

              setTimeout(() => {
                document.getElementById('messageScroll').scrollTop = document.getElementById('messageScroll').scrollHeight;
              }, 500);
              //console.log(res);
            }
          },
          err => {
            console.error(err);
            this.alertService.alertError('Internal Server Error');
          }
        );
    }

  }

  scroll() {
    setTimeout(() => {
      //console.log('scroll');
      document.getElementById('messageScroll').scrollTop = document.getElementById('messageScroll').scrollHeight;
    }, 1000);
  }

  public LIVECHAT_SESSION(payload) {
    this.service
      .LIVECHAT_SESSION(payload)
      .subscribe(
        res => {
          if (res) {
            //console.log(res);
          }
        },
        err => {
          console.error(err);
          this.alertService.alertError('Internal Server Error');
        }
      );
  }

}

