import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SettingService } from 'src/app/services/setting.service';
import { env } from 'src/app/shared/env-consts';



@Component({
  selector: 'app-setting-social-network',
  templateUrl: './setting-social-network.component.html',
  styleUrls: ['./setting-social-network.component.css']
})
export class SettingSocialNetworkComponent implements OnInit {

  settingSocialNetworkForm: FormGroup;
  settingSocialNetworks: any[];
  settingId: string;
  imagePath: string;
  editMode = false;
  imgURL: string  ;
  socialLogoURL: string | ArrayBuffer;

  private fileIcon;
  socialNetwork;
  message;

  constructor(private seService: SettingService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.imgURL = env.assestUrl;
    this.initForm();
    this.socialNetwork = { _id: '', title: '', link: '', socialLogo: '' };
    this.initForm();

    this.seService.getAll().subscribe((setting) => {
      this.settingId = setting[0]._id;

      this.settingSocialNetworks = setting[0].socialNetworks;
    });


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
      this.socialLogoURL = reader.result;
    }
    this.fileIcon = (files[0]);

    this.settingSocialNetworkForm.patchValue({ socialLogo: files[0].name })


    this.socialNetwork.socialLogo = '';
  }


  removeSettingSocialNetwork(socialNetworkId) {


    this.seService.deleteSettingSocialNetwork(socialNetworkId).subscribe((result) => {
      const setting = result['body'];


      if (setting) {
        this.settingSocialNetworks = setting['result'].socialNetworks;
      }
    });

  }
  onNavigate() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {


    this.seService.addSettingSocialNetwork(this.settingSocialNetworkForm.value, this.settingId, this.fileIcon).subscribe((result) => {
      const setting = result['body'];
      if (setting) {
        this.settingSocialNetworks = setting['result'].socialNetworks;
      }
      this.settingSocialNetworkForm.reset();
    });

  }
  private initForm() {

    this.settingSocialNetworkForm = new FormGroup({

      title: new FormControl('', Validators.required),
      link: new FormControl('', Validators.required),
      socialLogo: new FormControl('', Validators.required)
    });
  }

  private setData() {

    if (this.editMode) {





      console.log(this.imgURL);

      this.settingSocialNetworkForm.setValue({
        title: this.socialNetwork.title,
        link: this.socialNetwork.link,
        socialLogo: this.socialNetwork.socialLogo
      });

    }



  }
}
