import { Component, OnInit } from '@angular/core';
import { STRINGS } from 'src/app/shared/values/strings';
import { CATEGORYS } from './Mock.category';
import { CHOOSES } from './Mock.chooses';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }
  string=STRINGS;
  categorys=CATEGORYS;
  chooses=CHOOSES;
  ngOnInit() {
  }

}
