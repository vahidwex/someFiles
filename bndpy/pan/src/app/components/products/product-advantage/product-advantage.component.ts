import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from 'src/app/services/product.service';
import { ProductAdvantageModel } from 'src/app/shared/models/product-advantage.model';
import { env } from 'src/app/shared/env-consts';

@Component({
  selector: 'app-product-advantage',
  templateUrl: './product-advantage.component.html',
  styleUrls: ['./product-advantage.component.css']
})
export class ProductAdvantageComponent implements OnInit {

  productAdvantageForm: FormGroup;
  productAdvantages: ProductAdvantageModel[];
  productId: string;
  imagePath: string;
  editMode = false;
  imgURL: string | ArrayBuffer;
  iconURL: string | ArrayBuffer;
  private fileImage;
  private fileIcon;
  advantage: ProductAdvantageModel;
  message;

  constructor(private prService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.advantage = { _id: '', title: '', desc: '', image: '', icon: '' }
    this.route.params.subscribe((params: Params) => {
      this.productId = params.id;
      this.prService.getById(params.id).subscribe((product) => {
        this.productAdvantages = product[0].advantages;
      });
    });

  }
  onUploadImage(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.fileImage=( files[0]);

    this.productAdvantageForm.patchValue({image : files[0].name})


    this.advantage.image = '';
  }


  onUploadIcon(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.iconURL = reader.result;
    }
    this.fileIcon=( files[0]);

    this.productAdvantageForm.patchValue({icon :  files[0].name})


    this.advantage.icon = '';
  }


  removeProducts(advantageId) {


    this.prService.deleteProductAdvantages(this.productId, advantageId).subscribe((result) => {
      const product = result['body'];


      if (product) {
        this.productAdvantages = product['product'].advantages;
      }
    });

  }
  onNavigate() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {


    this.prService.addProductAdvantages(this.productAdvantageForm.value, this.productId, this.fileImage,this.fileIcon).subscribe((result) => {
      const product = result['body'];
      if (product) {
        this.productAdvantages = product['product'].advantages;
      }
      this.productAdvantageForm.reset();

    });

  }
  private initForm() {

    this.productAdvantageForm = new FormGroup({

      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      icon: new FormControl('', Validators.required)
    });
  }

  private setData() {

    if (this.editMode) {




      //this.imgURL = env.assestUrl + this.advantage.image;
      console.log(this.imgURL);

      this.productAdvantageForm.setValue({
        title: this.advantage.title,
        desc: this.advantage.desc,
        image: this.advantage.image,
        icon: this.advantage.icon
      });

    }



  }
}
