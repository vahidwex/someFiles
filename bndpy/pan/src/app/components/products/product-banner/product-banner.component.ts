import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { BannersOfProductModel } from 'src/app/shared/models/bannersOfProductModel';

@Component({
  selector: 'app-product-banner',
  templateUrl: './product-banner.component.html',
  styleUrls: ['./product-banner.component.css']
})
export class ProductBannerComponent implements OnInit {

  productBannerform: FormGroup;
  bannerArray: BannersOfProductModel[];
  bannersId
  productId: string;
  filePath: string;
  editMode = false;
  imgURL: string | ArrayBuffer;
  iconURL: string | ArrayBuffer;
  private fileFile;
  private fileIcon;
  banners: BannersOfProductModel;
  message;

  constructor(private prService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.Getall();

  }
  Getall(){
    this.banners = { _id: '', title: '', desc: '', file: '', icon: '', fileType: '' }
    this.route.params.subscribe((params: Params) => {

      this.productId = params.id;
      this.prService.getById(params.id).subscribe((res:any) => {
        this.bannerArray = res[0].banners;
      });
    });
  }
  onUploadFile(files) {
    if (files.length === 0) {
      return;
    }



    let reader = new FileReader();
    this.filePath = files;
    reader.readAsDataURL(files[0]);


    this.fileFile =files[0];

    this.productBannerform.patchValue({ file: files[0].name })


    this.banners.file = '';
  }


  onUploadIcon(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only files are supported.';
      return;
    }

    let reader = new FileReader();
    this.filePath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.iconURL = reader.result;
    }
    this.fileIcon = (files[0]);

    this.productBannerform.patchValue({ icon: files[0].name })


    this.banners.icon = '';
  }


  removeProducts(bannerId) {


    this.prService.deleteProductBanners(bannerId).subscribe((result) => {
      this.Getall();

    });

  }
  onNavigate() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {

    // 
    this.editMode==false?this.AddeducationalSources():this.EditeducationalSources();
    this.editMode=false;
  }
  EditeducationalSources(){

    this.prService.EditProductBanners(this.productBannerform.value, this.fileFile, this.fileIcon, this.bannersId)
      .subscribe((result) => {
        console.log("result Edit")
          console.log(result)
        this.Getall();

        this.productBannerform.reset();
      });

  }
  AddeducationalSources(){
    this.prService.addProductBanners(this.productBannerform.value, this.fileFile, this.fileIcon,this.productId)
      .subscribe((result) => {
         
        this.Getall();

        this.productBannerform.reset();
      });
  }
  private initForm() {

    this.productBannerform = new FormGroup({

      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
      icon: new FormControl('', Validators.required),
      fileType: new FormControl('')
    });
  }

  private setData() {

    if (this.editMode) {




      //this.imgURL = env.assestUrl + this.banners.file;
      console.log(this.imgURL);

      this.productBannerform.setValue({
        title: this.banners.title,
        desc: this.banners.desc,
        fileType: this.banners.fileType,
        file: this.banners.file,
        icon: this.banners.icon
      });

    }



  }
  Edit(banner){
    this.editMode=true;
    console.log(banner)
    this.bannersId=banner._id;
    this.productBannerform.setValue({
      title: banner.title,
      desc: banner.desc,
      fileType: banner.fileType,
      file: banner.file,
      icon: banner.icon
    });
  }
}
