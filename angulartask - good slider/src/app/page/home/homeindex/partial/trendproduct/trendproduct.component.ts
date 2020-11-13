import { Component, OnInit } from '@angular/core';
import { Trendsmock } from './Mock.trendsproduct';

@Component({
  selector: 'app-trendproduct',
  templateUrl: './trendproduct.component.html',
  styleUrls: ['./trendproduct.component.scss']
})
export class TrendproductComponent implements OnInit {


  winter:any[]=[];
  green:any[]=[];
  various:any[]=[];
  data=Trendsmock;
  
  constructor() {
    for (let i = 0; i < 8; i++) {
      this.winter.push(this.data[i])
    }
    for (let i = 8; i < 16; i++) {
      this.green.push(this.data[i])
    }
    for (let i = 16; i < 24; i++) {
      this.various.push(this.data[i])
    }
   }
  
  winters(){
    this.items=[];
    this.items=this.winter;
  }
  greens(){
    this.items=[];
    this.items=this.green;
  }
  variouss(){
    this.items=[];
    this.items=this.various;
  }
  active=1;
  items=this.winter;
  ngOnInit() {
  }

}
