import { Component, OnInit } from '@angular/core';
import { SettingService } from './shared/services/api/Setting.service';
import { ShareSettingService } from './shared/services/sharing-services/share-setting.service';
import {BuyCountBadgesService}from './shared/services/sharing-services/buyCountBadges.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private SettingService:SettingService,
    private ShareSettingService:ShareSettingService,
    private badgesService:BuyCountBadgesService
  ){}
  ngOnInit(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
   this.SettingService.GetAll().subscribe(res=>{

      this.ShareSettingService.settingHolder.next(res[0])
   })
   
   this.badgesService.calculateCount();
  
  }
  
}
