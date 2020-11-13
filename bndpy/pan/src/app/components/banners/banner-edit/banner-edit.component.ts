import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';

import { env } from 'src/app/shared/env-consts';



@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.css']
})
export class BannerEditComponent implements OnInit {

  banner = { title: '', image: '', description: '', link: '' };

  bannerForm: FormGroup;
  editMode = false;
  imagePath;
  imgURL: any;
  message;
  id: string;
  private file;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private bnService: BannerService) { }

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
      this.message = 'Only images are supported.';
      return;
    }

    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.file = files[0];

    this.bannerForm.patchValue({image : this.file.name})


    this.banner.image = '';

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
      console.log(this.bannerForm)
      this.bnService.updateBanner(this.bannerForm.value, this.file, this.id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {
      this.bnService.addBanner(this.bannerForm.value, this.file)
        .subscribe(
          (result) => this.onCancel(),
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.bannerForm.setValue({ title: '', image: '', description: '', link: '' });
    this.banner.image = '';
  }

  setData() {

    if (this.editMode) {
      this.bnService.getById(this.id).subscribe((banner) => {

        console.log('banner of get: ', banner);
        this.banner = banner[0];
        this.banner.image = env.assestUrl + this.banner.image;
        this.bannerForm.setValue({
          title: this.banner.title,
          description: this.banner.description,
          link: this.banner.link,
          image: this.banner.image
        })
      })
    }



  }

  private initForm() {

    this.bannerForm = new FormGroup({
      title: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      link: new FormControl('', Validators.required)
    });
  }


}
