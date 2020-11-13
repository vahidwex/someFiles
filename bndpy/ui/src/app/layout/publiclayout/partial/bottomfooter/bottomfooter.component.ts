import { Component, OnInit } from '@angular/core';
import { IMAGES } from './Mock.images';
import { STRINGS } from '../../../../shared/values/strings';
import { ShareSettingService } from '../../../../shared/services/sharing-services/share-setting.service';


@Component({
  selector: 'app-bottomfooter',
  templateUrl: './bottomfooter.component.html',
  styleUrls: ['./bottomfooter.component.scss']
})
export class BottomfooterComponent implements OnInit {

  constructor(
    private ShareSettingService:ShareSettingService
  ) { }
  items=IMAGES;
  downFooterText
  string = STRINGS;
  ngOnInit() {
    this.ShareSettingService.settingHolder.subscribe(res=>{
      this.downFooterText=res.downFooterText;
    })
  }

}
