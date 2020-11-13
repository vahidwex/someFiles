import { Component, OnInit } from '@angular/core';
import { STRINGS } from '../../../../../shared/values/strings';
import { CustomerService } from '../../../../../shared/services/api/customers.service';
import { ShareSettingService } from '../../../../../shared/services/sharing-services/share-setting.service';
import { ENV } from '../../../../../shared/values/env';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent implements OnInit {
string=STRINGS;
env=ENV

  constructor(
   private CustomerService:CustomerService,
   private ShareSettingService:ShareSettingService

  ) { }
  items:any[]=[];
  customersHeader
  customOptions: any = {
    loop: true,
    margin:10,
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
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  ngOnInit() {
    this.ShareSettingService.settingHolder.subscribe(res=>{
      this.customersHeader=res.customers;

    
    });
    this.CustomerService.GetAll().subscribe(res=>{
      this.items=res;
    })
  }

}
