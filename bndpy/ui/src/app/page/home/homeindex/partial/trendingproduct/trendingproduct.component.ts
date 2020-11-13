import { Component, OnInit } from '@angular/core';
import { SolutionService } from '../../../../../shared/services/api/solution.service';
import { ShareSettingService } from '../../../../../shared/services/sharing-services/share-setting.service';
import { ENV } from '../../../../../shared/values/env';

@Component({
  selector: 'app-trendingproduct',
  templateUrl: './trendingproduct.component.html',
  styleUrls: ['./trendingproduct.component.scss']
})
export class TrendingproductComponent implements OnInit {
  
  env=ENV

  constructor(
    private SolutionService:SolutionService,
    private ShareSettingService:ShareSettingService

  ) { }
  items:any=[];
  solutionheader
  customOptions: any = {
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    margin:30,
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
      this.solutionheader=res.solutionHeader;

    
    });
    this.SolutionService.GetAll().subscribe(res=>{
      this.items=res
    })
  }

}
