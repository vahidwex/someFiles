import { Component, OnInit } from '@angular/core';
import { Slides } from './Mock.slides';
import { STRINGS } from 'src/app/shared/values/strings';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() {
    this.autoplay();
   }
  items=Slides;
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
     this.clear= setInterval(() => {
        this.indexActive = i;
        i = (i < dataLen - 1) ? ++i : 0; 
      }, this.TIME_OUT);
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
  }

}
