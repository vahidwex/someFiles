import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StoresService } from 'src/app/services/stores.service';
import { BannerOfStoreModel } from 'src/app/shared/models/stores.model';


@Component({
  selector: 'app-stores-detail',
  templateUrl: './stores-detail.component.html',
  styleUrls: ['./stores-detail.component.css']
})
export class StoresDetailComponent implements OnInit {

  productBannerform: FormGroup;
  bannerArray: BannerOfStoreModel[];
  bannersId
  storeId: string;
  filePath: string;
  editMode = false;
  imgURL: string | ArrayBuffer;
  iconURL: string | ArrayBuffer;
  private fileFile;
  private fileIcon;
  banners: BannerOfStoreModel;
  message;

  constructor(private prService: StoresService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.Getall();

  }
  Getall(){
    this.banners = { _id: '', title: '', desc: '', image: ''}
    this.route.params.subscribe((params: Params) => {

      this.storeId = params.id;
      this.prService.GetById(params.id).subscribe((res:any) => {
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


    this.banners.image = '';
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


    this.banners.image = '';
  }


  removeProducts(bannerId) {


    this.prService.RomeveBannerFromStore(bannerId,this.storeId).subscribe((result) => {
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

    this.prService.EditBannerToStore( this.bannersId,this.productBannerform.value, this.fileFile)
      .subscribe((result) => {
        console.log("result Edit")
          console.log(result)
        this.Getall();

        this.productBannerform.reset();
      });

  }
  AddeducationalSources(){
    this.prService.AddBannerToStore(this.storeId,this.productBannerform.value, this.fileFile)
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
    });
  }
  
  private setData() {

    if (this.editMode) {

      this.productBannerform.setValue({
        title: this.banners.title,
        desc: this.banners.desc,
        image: this.banners.image,
      });

    }



  }
  Edit(banner){
    this.editMode=true;
    console.log(banner)
    this.bannersId=banner._id;
    this.productBannerform.patchValue({
      title: banner.title,
      desc: banner.desc,
      image: banner.image,

    });
  }

}
