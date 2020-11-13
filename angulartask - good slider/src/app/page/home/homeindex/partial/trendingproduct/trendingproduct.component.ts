import { Component, OnInit } from '@angular/core';
import { TRENDINGITEMMOCK } from './Mock.trendingitem';

@Component({
  selector: 'app-trendingproduct',
  templateUrl: './trendingproduct.component.html',
  styleUrls: ['./trendingproduct.component.scss']
})
export class TrendingproductComponent implements OnInit {

  constructor() { }
  items=TRENDINGITEMMOCK;

  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
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
        items: 4
      }
    },
    nav: false
  }

  ngOnInit() {
  }

}
