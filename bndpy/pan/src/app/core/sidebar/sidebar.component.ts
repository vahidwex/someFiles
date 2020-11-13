import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/shared/models/user.model';
import { env } from 'src/app/shared/env-consts';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  imgUrl;
  username ='';

  constructor(private auService: AuthService, private usService: UserService) { }

  ngOnInit() {
    console.log( this.auService.username
);

    if (this.auService.username != '') {
      this.imgUrl = this.auService.avatarUrl;
      this.username = this.auService.username;
    } else {
      this.usService.getByToken().subscribe(
        (user: UserModel) => {
          if (user) {


            this.imgUrl =env.assestUrl+ user.avatar;
            this.username = user.fullName;
          }
        }
      )
    }
  }

}
