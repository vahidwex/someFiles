import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/api/product.service';
import { ShareSettingService } from '../../../../../shared/services/sharing-services/share-setting.service';
import { ENV } from '../../../../../shared/values/env';
import { ProductKindService } from '../../../../../shared/services/api/productKind.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trendproduct',
  templateUrl: './trendproduct.component.html',
  styleUrls: ['./trendproduct.component.scss']
})
export class TrendproductComponent implements OnInit {
  
  env=ENV
  prodkinds:any[]=[];
  pkChoosen=''
  winter:any[]=[];
  green:any[]=[];
  various:any[]=[];
  data:any=[];
  productheader
  savedIndex
  constructor(
    private ProductService:ProductService,
    private ShareSettingService:ShareSettingService,
    private ProductKindService:ProductKindService,
    private router:Router
  ) {
    
   }
  
 
  active=1;
  items=this.winter;

  ngOnInit() {
    this.ProductKindService.GetAll().subscribe(res=>{
      this.prodkinds=res;
    })
    this.ShareSettingService.settingHolder.subscribe(res=>{
      this.productheader=res.productHeader;
    });
    this.getAllProducts()
  }
  getAllProducts(){
    this.ProductService.GetAll().subscribe(res=>{
      this.data=res;
    })
  }
  getProductByStore(id){
    this.pkChoosen=id
    this.ProductService.GetproductbyPKid(id).subscribe(res=>{
      this.data=res;
    })
  }
  routeThisShit(){
    if(this.savedIndex==0){
      this.router.navigate(['products'])
    }else{
      this.router.navigate(['products',this.pkChoosen])
    }
  }
}
