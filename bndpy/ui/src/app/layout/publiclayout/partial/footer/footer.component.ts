import { Component, OnInit } from '@angular/core';
import { ShareSettingService } from '../../../../shared/services/sharing-services/share-setting.service';
import { SolutionKindService } from '../../../../shared/services/api/solutionKind.service';
import { ProductService } from '../../../../shared/services/api/product.service';
import { ENV } from '../../../../shared/values/env';





@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  
  socialNetworks
  abutUsFooter
  location
  call
  mail
  fax

  firstcolumn
  secoundcolumn
  thirdcolumn
  logo=""

  constructor(
    private ShareSettingService:ShareSettingService,
    private SolutionKindService:SolutionKindService,
    private ProductService:ProductService
  ) { }
 
  Products=[];
  SolutionKinds=[]
  env=ENV
  ngOnInit() {
    // this.SolutionKindService.GetAll().subscribe(res=>{
      
    //   this.SolutionKinds=res;
    // })
    this.ProductService.GetAll().subscribe(res=>{
      this.Products=res;
    })
    this.ShareSettingService.settingHolder.subscribe(res=>{
      this.logo=res.logo;
      this.abutUsFooter=res.abutUsFooter;
      this.location=res.location
      this.fax=res.fax
      this.call=res.tel
      this.mail=res.email
      this.firstcolumn=res.footerFirstCoumn
      this.secoundcolumn=res.footersecoundColumn
      this.thirdcolumn=res.footerthirdColumn,
      this.socialNetworks=res.socialNetworks;
      
    })
  }

}
