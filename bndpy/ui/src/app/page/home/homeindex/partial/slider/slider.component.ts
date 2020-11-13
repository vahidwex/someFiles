import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
// import { Slides } from './Mock.slides';
import { STRINGS } from '../../../../../shared/values/strings';
import { isPlatformBrowser } from '@angular/common';
import { BannersService } from '../../../../../shared/services/api/banners.service';
import { ENV } from '../../../../../shared/values/env';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  
  env=ENV

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private BannersService:BannersService
  ) {
    this.autoplay();
   }
  items:any=[];
  string=STRINGS;

  indexActive=0;
  TIME_OUT=4000;

   
   clear;
   lengtharray;
  autoplay() {
    let dataLen = this.items.length;
    this.lengtharray=dataLen;
    if(dataLen > 0) {
      let i = 1;
      if(isPlatformBrowser(this.platformId)) {
          this.clear= setInterval(() => {
              this.indexActive = i;
              i = (i < dataLen - 1) ? ++i : 0; 
            }, this.TIME_OUT);
          }
    }

  }
  stop(){
    clearInterval(this.clear);
  }
  next(){
    if(this.indexActive<this.lengtharray-1){
      this.indexActive++;
    }
  }
  prev(){
    if(this.indexActive>=this.lengtharray-1){
      this.indexActive--;
    }
  }
  ngOnInit() {
    this.BannersService.GetAll().subscribe(res=>{

      this.items=res;
      console.log(res)
    })
  }

}
