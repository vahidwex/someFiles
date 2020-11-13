import { Component, OnInit } from '@angular/core';
import { BESTPRODUCTS } from './Mock.bestproduct';
import { STRINGS } from '../../../../../shared/values/strings';

@Component({
  selector: 'app-bestproducts',
  templateUrl: './bestproducts.component.html',
  styleUrls: ['./bestproducts.component.scss']
})
export class BestproductsComponent implements OnInit {

  constructor() { }
  items=BESTPRODUCTS;
  string=STRINGS;
  item1;
  item2;
  item3;
  item4;
  item5;
  ngOnInit() {
    this.item1=this.items[0];
    this.item2=this.items[1];
    this.item3=this.items[2];
    this.item4=this.items[3];
    this.item5=this.items[4];

    

  }
  public getById(id: number) {
    let result;
    
    result = this.items.filter(x => x.id == id)[0];
    return result;
  }

}
