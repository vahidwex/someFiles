import { Component, OnInit } from '@angular/core';
import { ShareSettingService } from 'src/app/shared/services/sharing-services/share-setting.service';
import { Router, ResolveEnd } from '@angular/router';

@Component({
  selector: 'app-publiclayout',
  templateUrl: './publiclayout.component.html',
  styleUrls: ['./publiclayout.component.scss']
})
export class PubliclayoutComponent implements OnInit {

  constructor(
    private ShareSettingService:ShareSettingService,
    private router:Router
  ) { }
  loadingRouteConfig:boolean
  ngOnInit() {
    this.router.events.subscribe(event => {
     if (event instanceof ResolveEnd) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

      
      
  });
    this.ShareSettingService.settingHolder.subscribe(res=>{
         
        });
  }

}
