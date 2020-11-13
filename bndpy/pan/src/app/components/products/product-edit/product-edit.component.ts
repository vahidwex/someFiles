import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

import { env } from 'src/app/shared/env-consts';
import { ProductKindModel } from 'src/app/shared/models/product-kind.model';
import { ProductKindService } from 'src/app/services/product-kind.service';



@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product = { title: '', logo: '', shortDesc: '', LongDesc: '',productKind:'',titleEnglish:'',like:'',bazdid:'',price:'',discountPercent:'',productCode:'',productPoint:'',priority:'',exist:'',sellCount:'' };
  kinds: ProductKindModel[];
  productForm: FormGroup;
  editMode = false;
  logoPath;
  imgURL: any;
  message;
  id: string;
  private file;
  kindz=[]

  constructor(private route: ActivatedRoute,
              private PKService:ProductKindService,
              private router: Router,
              private bnService: ProductService) { }

  ngOnInit() {

    this.id = this.route.snapshot.params.id;
    this.initForm();


    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
          this.editMode = params.id != null;
          this.setData();
        }
      );

  }

  onUpload(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only logos are supported.';
      return;
    }

    let reader = new FileReader();
    this.logoPath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.file = files[0];

    this.productForm.patchValue({logo : this.file.name})


    this.product.logo = '';

  }

  onBack(){
    if(this.editMode){
      this.router.navigate(['../../'], { relativeTo: this.route });
    }else{
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {
    if (this.editMode) {
      // console.log(this.productForm)
      this.bnService.updateProduct(this.productForm.value, this.file, this.id)
        .subscribe(
          (result) => {this.onBack()},
          (error) => console.log(error)
        );
    } else {
      this.bnService.addProduct(this.productForm.value, this.file)
        .subscribe(
          (result) => {this.onCancel()},
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.productForm.setValue({ title: '', logo: '', shortDesc: '', LongDesc: '' ,productKind:'',titleEnglish:'',like:'',bazdid:'',price:'',discountPercent:'',productCode:'',productPoint:'',priority:'',exist:'',sellCount:'' });
    this.product.logo = '';
  }

  setData() {

    if (this.editMode) {
      this.bnService.getById(this.id).subscribe((product) => {
        
        product[0].productKind.forEach(element => {
          this.kindz.push(element)
          
        });
        // console.log('product of get: ', product);
        this.product = product[0];
        this.product.logo = env.assestUrl + this.product.logo;
        this.productForm.setValue({
          title: this.product.title,
          titleEnglish: this.product.titleEnglish,
          shortDesc: this.product.shortDesc,
          LongDesc: this.product.LongDesc,
          productKind:this.product.productKind,
          like:this.product.like,
          bazdid:this.product.bazdid,
          price:this.product.price,
          discountPercent:this.product.discountPercent,

          productCode:this.product.productCode,
          productPoint:this.product.productPoint,
          priority:this.product.priority,
          exist:this.product.exist,

          sellCount:this.product.sellCount,
          logo: this.product.logo
        })
      })
    }



  }
  getby(){
    this.bnService.getById(this.id).subscribe((product) => {
      this.kindz=[];
      product[0].productKind.forEach(element => {
        this.kindz.push(element)
        
      });
    });
  }
  removeProducts(id){
    this.bnService.deleteProduct_productKind(this.id,id).subscribe(res=>{
     this.getby();
    })
  }
  private initForm() {

    this.PKService.getAll().subscribe((kinds) => this.kinds = kinds);

    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
      titleEnglish: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required),
      shortDesc: new FormControl('', Validators.required),
      LongDesc: new FormControl('', Validators.required),
      productKind: new FormControl('', Validators.required),
      like: new FormControl('', Validators.required),
      bazdid: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      discountPercent: new FormControl('', Validators.required),

      productCode: new FormControl(''),
      productPoint: new FormControl(''),
      priority: new FormControl('', Validators.required),
      exist: new FormControl('', Validators.required),

      sellCount: new FormControl('', Validators.required)
    });
  }


}
