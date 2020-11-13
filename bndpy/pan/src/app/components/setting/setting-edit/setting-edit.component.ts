import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SettingService } from 'src/app/services/setting.service';

import { env } from 'src/app/shared/env-consts';
import { SettingModel } from 'src/app/shared/models/setting.model';



@Component({
  selector: 'app-setting-edit',
  templateUrl: './setting-edit.component.html',
  styleUrls: ['./setting-edit.component.css']
})
export class SettingEditComponent implements OnInit {

  setting: SettingModel;
  settingExist = false;
  settingForm: FormGroup;
  editMode = false;
  imagePath;
  imgURL: any;
  message;
  id: string;
  private file;
  private fileBg;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private seService: SettingService) { }

  ngOnInit() {


    this.initForm();


    this.seService.getAll()
      .subscribe(
        (setting: SettingModel[]) => {
          if (setting.length) {
            console.log("setting")
            console.log(setting)

            this.setting = setting[0];
            this.editMode = true;
            this.settingExist = true;
            this.setData();
          }
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

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.file = files[0];

    this.settingForm.patchValue({ logo: this.file.name });


    // this.setting.logo = '';

  }
  onUploadBackGround(files){
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.fileBg = files[0];

    this.settingForm.patchValue({ backGround: this.fileBg.name });
  }
  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    console.log(this.editMode)
    if (this.editMode) {

      this.seService.updateSetting(this.settingForm.value, this.file,this.fileBg ,this.setting._id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {

      this.seService.addSetting(this.settingForm.value, this.file,this.fileBg)
        .subscribe(
          (result) => {
            this.onCancel(); this.settingExist = true;
          },
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    //  this.settingForm.setValue({ companyName: '', logo: '', email: '', tel: '', fax: '' });

  }

  setData() {

    if (this.editMode) {




      this.imgURL = env.assestUrl + this.setting.logo;
      console.log(this.imgURL);

      this.settingForm.setValue({
        backGround: this.setting.backGround,
        companyName: this.setting.companyName,
        email: this.setting.email,
        tel: this.setting.tel,
        abutUsPage: this.setting.abutUsPage,        
        fax: this.setting.fax,
        logo: this.setting.logo,
        HeaderMessage:this.setting.HeaderMessage,
        productHeader:this.setting.productHeader,
        abutUsFooter:this.setting.abutUsFooter,
        location:this.setting.location,
        downFooterText:this.setting.downFooterText,
      });

    }



  }

  private initForm() {

    this.settingForm = new FormGroup({
      
      companyName: new FormControl('', Validators.required),
      backGround: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      HeaderMessage: new FormControl('', Validators.required),
      productHeader: new FormControl('', Validators.required),
      abutUsFooter: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      downFooterText: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required),
      abutUsPage: new FormControl('', Validators.required)

      
    });
  }












}
