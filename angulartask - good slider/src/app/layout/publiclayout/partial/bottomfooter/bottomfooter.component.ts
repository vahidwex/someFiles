import { Component, OnInit } from '@angular/core';
import { IMAGES } from './Mock.images';
import { STRINGS } from 'src/app/shared/values/strings';

@Component({
  selector: 'app-bottomfooter',
  templateUrl: './bottomfooter.component.html',
  styleUrls: ['./bottomfooter.component.scss']
})
export class BottomfooterComponent implements OnInit {

  constructor() { }
  items=IMAGES;
  string = STRINGS;
  ngOnInit() {
  }

}
