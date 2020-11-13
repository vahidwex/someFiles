import { Component, OnInit } from '@angular/core';
import { instagrampostsMock } from './Mock.instagram';
import { STRINGS } from 'src/app/shared/values/strings';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent implements OnInit {
string=STRINGS;
  constructor() { }
  items=instagrampostsMock;
  
  customOptions: any = {
    loop: true,
    margin:0,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  ngOnInit() {
  }

}
