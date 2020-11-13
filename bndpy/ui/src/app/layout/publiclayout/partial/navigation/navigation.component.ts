import { Component, OnInit } from '@angular/core';
import { BuyCountBadgesService } from 'src/app/shared/services/sharing-services/buyCountBadges.service';
import { ShareSettingService } from '../../../../shared/services/sharing-services/share-setting.service';
import { ENV } from '../../../../shared/values/env';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  logo=""
open =false;
opentwo=false;
companyName=""
env=ENV
count=0;
  constructor(
    private ShareSettingService:ShareSettingService,
    private badgesService:BuyCountBadgesService

  ) { }
  ngOnInit() {
    this.ShareSettingService.settingHolder.subscribe(res=>{
        this.logo=res.logo;
        this.companyName=res.companyName
    });
    this.badgesService.currentCount.subscribe(res=>{
      this.count=res;
    })
  }

}
