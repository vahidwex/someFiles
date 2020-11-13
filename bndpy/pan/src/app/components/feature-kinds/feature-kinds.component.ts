import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FeatureKindService } from 'src/app/services/feature-kind.service';
import { env } from 'src/app/shared/env-consts';
import { FeatureKindModel } from 'src/app/shared/models/feature-kind.model';



@Component({
  selector: 'app-feature-kinds',
  templateUrl: './feature-kinds.component.html',
  styleUrls: ['./feature-kinds.component.css']
})
export class FeatureKindsComponent implements OnInit {

  featureKindForm: FormGroup;
  featureKinds: FeatureKindModel[];
  featureKindId: string;
  imagePath: string;
  editMode = false;
  imgURL: string;
  logoURL: string | ArrayBuffer;

  private fileIcon;
  featureKind = { _id: '', title: '', logo: '' };;
  message;

  constructor(private fkService: FeatureKindService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.imgURL = env.assestUrl;
    this.initForm();

    this.fkService.getAll().subscribe((featureKind) => {
      this.featureKinds = featureKind;
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
      this.logoURL = reader.result;
    }
    this.fileIcon = (files[0]);

    this.featureKindForm.patchValue({ logo: files[0].name })


    this.featureKind.logo = '';
  }


  removeFeatureKinds(featureKindId) {


    this.fkService.deleteFeatureKind(featureKindId).subscribe((result) => {
      const featureKind = result['body'];
      if (featureKind) {
        this.featureKinds = featureKind['result'];
      }
    });

  }
  editFeatureKinds(featureKindId) {

    this.editMode=true
    this.fkService.getById(featureKindId).subscribe((result) => {

      if (result) {
        this.featureKind  = result[0];
        this.featureKind.logo = env.assestUrl + this.featureKind.logo;

        this.featureKindForm.setValue({
          title: result[0].title,
          logo: result[0].logo
        });
      }
    });

  }
  onNavigate() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {
    if (this.editMode) {

      this.fkService.updateFeatureKind(this.featureKindForm.value, this.fileIcon, this.featureKind._id)
        .subscribe(
          (result) => {
            const featureKind = result['body'];
            if (featureKind) {
              this.featureKinds = featureKind['result'];
            }
          },
          (error) => console.log(error)
        );
    } else {
      this.fkService.addFeatureKind(this.featureKindForm.value, this.fileIcon).subscribe((result) => {
        const featureKind = result['body'];
        if (featureKind) {
          this.featureKinds = featureKind['result'];
          this.featureKindForm.reset();
        }
      });
    }
  }
  private initForm() {

    this.featureKindForm = new FormGroup({
      title: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required)
    });
  }

  private setData() {

    if (this.editMode) {
      this.featureKindForm.setValue({
        title: this.featureKind.title,
        logo: this.featureKind.logo
      });

    }



  }
}
