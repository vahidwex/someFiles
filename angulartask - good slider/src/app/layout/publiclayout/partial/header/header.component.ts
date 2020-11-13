import { Component, OnInit } from '@angular/core';
import { STRINGS } from 'src/app/shared/values/strings';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  strings=STRINGS;
  ngOnInit() {
  }

}
