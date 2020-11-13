import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/api/login.service';
import { ShareSettingService } from '../../../../shared/services/sharing-services/share-setting.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private ShareSettingService:ShareSettingService,
    private UserService:UserService
  ) { }
  HeaderMessage
  tel
  logged=false;

  ngOnInit() {
    this.ShareSettingService.settingHolder.subscribe(res=>{
      this.HeaderMessage=res.HeaderMessage;
      this.tel=res.tel;
    
    });
    this.checkAuth();
  }
  checkAuth(){

    this.UserService.loggedStatus.subscribe(res=>{
      this.logged=res;
    })
  }
  open(){
    this.UserService.showStatus.next(true);
  }
  close(){
    localStorage.removeItem('UiUser')
    this.logged=false;
  }
  
}
