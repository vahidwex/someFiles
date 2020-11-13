import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../../shared/services/api/Setting.service';
import { CapabilityService } from '../../../../shared/services/api/capability.service';
import { CustomerService } from '../../../../shared/services/api/customers.service';
import { TechnologyService } from '../../../../shared/services/api/technology.service';
import { ENV } from '../../../../shared/values/env';
import { TitleUtilityService } from 'src/app/shared/services/utilities/title.service';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(
    private SettingService:SettingService,
    private CapabilityService:CapabilityService,
    private CustomerService:CustomerService,
    private TechnologyService:TechnologyService,
    private TitleUtilityService:TitleUtilityService
  ) { }
  env=ENV

  Settings:any='';
  Capabilitys:any[];
  Customers:any[];
  Technologys:any[];

  location
  fax
  call
  mail
customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin:30,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
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
  ngOnInit(): void {
    this.TitleUtilityService.add("درباره ما")
    this.SettingService.GetAll().subscribe(res=>{
      this.Settings=res[0];
      this.location=this.Settings.location
      this.fax=this.Settings.fax
      this.call=this.Settings.tel
      this.mail=this.Settings.email
    })
    this.CapabilityService.GetAll().subscribe(res=>{
      this.Capabilitys=res;
    })
    this.CustomerService.GetAll().subscribe(res=>{
      this.Customers=res;
    })
    this.TechnologyService.GetAll().subscribe(res=>{
      this.Technologys=res;
    })
  }

}
