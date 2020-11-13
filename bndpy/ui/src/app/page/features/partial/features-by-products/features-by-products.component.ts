import { Component, OnInit } from '@angular/core';
import { TitleUtilityService } from '../../../../shared/services/utilities/title.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../shared/services/api/product.service';
import { ENV } from '../../../../shared/values/env';
@Component({
  selector: 'app-features-by-products',
  templateUrl: './features-by-products.component.html',
  styleUrls: ['./features-by-products.component.scss']
})
export class FeaturesByProductsComponent implements OnInit {

  constructor(
    private TitleUtilityService :TitleUtilityService,
    private route :ActivatedRoute,
    private ProductService :ProductService
  ) { }
  env=ENV

  product:any="";
  features:any[]=[];
  ngOnInit(): void {
    this.TitleUtilityService.add("ویژگی ها")
    this.route.params.subscribe(({name})=>{
      this.ProductService.GetProductByEnName(name).subscribe(res=>{

        this.product=res;
        this.features=res.features;
      })
    })
  }

}
