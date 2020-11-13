import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from 'src/app/services/product.service';
import { ProductFeatureModel } from 'src/app/shared/models/product-feature.model';

import { FeatureKindModel } from 'src/app/shared/models/feature-kind.model';
import { FeatureKindService } from 'src/app/services/feature-kind.service';
import { ProductDetailsService } from 'src/app/services/productDetails.service';
import { ProductDetailsModel } from 'src/app/shared/models/productDetails.model';

@Component({
  selector: 'app-product-feature',
  templateUrl: './product-feature.component.html',
  styleUrls: ['./product-feature.component.css']
})
export class ProductFeatureComponent implements OnInit {

  productFeatureForm: FormGroup;
  kinds: ProductDetailsModel[];
  productFeatures: ProductFeatureModel[];
  productId: string;
  imagePath: string;
  editMode = false;
  imgURL: string | ArrayBuffer;
  iconURL: string | ArrayBuffer;
  private fileImage;
  private fileIcon;
  feature: ProductFeatureModel;
  message;

  constructor(private prService: ProductService,
              private fkService: ProductDetailsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.feature = { _id:'',featureValue: '',productDetail : null,isFeature:false}
    this.route.params.subscribe((params: Params) => {
      this.productId = params.id;
      this.prService.getById(params.id).subscribe((product) => {
        this.productFeatures = product[0].productFeature;
        console.log(product)
      });
    });

  }
 

  getFeatures(){
    // this.productId = params.id;
      this.prService.getById(this.productId).subscribe((product) => {
        this.productFeatures = product[0].productFeature;
        // console.log(product)
      });
  }
  


  removeProducts(featureId) {

    
    this.prService.DeleteProductFeature(this.productId, featureId).subscribe((result) => {
      this.getFeatures();
    });

  }
  onNavigate() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {


    this.prService.AddproductFeature(this.productId,this.productFeatureForm.value).subscribe((result) => {
      this.getFeatures();
      this.productFeatureForm.setValue({
        featureValue: '',
        productDetail: null,
        isFeature: false
      });
    });

  }
  private initForm() {
    this.fkService.GetAll().subscribe((kinds) => this.kinds =kinds);
    this.productFeatureForm = new FormGroup({

      featureValue: new FormControl('', Validators.required),
      productDetail: new FormControl('', Validators.required),
      isFeature: new FormControl(false, Validators.required),
      
    });
  }

  private setData() {

    if (this.editMode) {




      //this.imgURL = env.assestUrl + this.feature.image;
      console.log(this.imgURL);

      this.productFeatureForm.setValue({
        featureValue: this.feature.featureValue,
        productDetail: this.feature.productDetail,
        isFeature: this.feature.isFeature
      });
      

    }



  }
}
