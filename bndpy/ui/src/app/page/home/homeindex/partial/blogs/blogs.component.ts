import { Component, OnInit } from '@angular/core';
import { EducationalSourcesService } from '../../../../../shared/services/api/educational-sources.service';
import { ShareSettingService } from '../../../../../shared/services/sharing-services/share-setting.service';
import { ENV } from '../../../../../shared/values/env';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor(
    private EducationalSourcesService:EducationalSourcesService,
    private ShareSettingService:ShareSettingService
  ) { }
  env=ENV

  items:any[]=[];
  subeducationalSources
  educationalSources
  customOptions: any = {
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    loop: true,
    margin:50,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

  ngOnInit() {
    this.ShareSettingService.settingHolder.subscribe(res=>{
      this.subeducationalSources=res.subeducationalSources;
      this.educationalSources=res.educationalSources;
    
    });
    this.EducationalSourcesService.GetAll().subscribe(res=>{
      this.items=res;
      console.log(res)
    })
  }

}
