import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Params, ActivatedRoute, Router } from '@angular/router';
import { CapabilityKindService } from 'src/app/services/capability-kind.service';
import { env } from 'src/app/shared/env-consts';


@Component({
  selector: 'app-capability-kind-edit',
  templateUrl: './capability-kind-edit.component.html',
  styleUrls: ['./capability-kind-edit.component.css']
})
export class CapabilityKindEditComponent implements OnInit {
  capabilityKind = { title: '', logo: '' , tags: '' };

  capabilityKindForm: FormGroup;
  editMode = false;
  logoPath;
  imgURL: any;
  message;
  id: string;
  private file;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private ckService: CapabilityKindService) { }

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

    this.capabilityKindForm.patchValue({logo : this.file.name})


    this.capabilityKind.logo = '';

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
      console.log(this.capabilityKindForm)
      this.ckService.updateCapabilityKind(this.capabilityKindForm.value, this.file, this.id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {
      this.ckService.addCapabilityKind(this.capabilityKindForm.value, this.file)
        .subscribe(
          (result) => this.onCancel(),
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.capabilityKindForm.setValue({ title: '', logo: '' , tags: '' });
    this.capabilityKind.logo = '';
  }

  setData() {

    if (this.editMode) {
      this.ckService.getById(this.id).subscribe((capabilityKind) => {

        console.log('capabilityKind of get: ', capabilityKind);
        this.capabilityKind = capabilityKind[0];
        this.capabilityKind.logo = env.assestUrl + this.capabilityKind.logo;
        console.log(this.capabilityKind.logo);

        this.capabilityKindForm.setValue({
          title: this.capabilityKind.title,

          tags: this.capabilityKind.tags,
          logo: this.capabilityKind.logo
        })
      })
    }



  }

  private initForm() {

    this.capabilityKindForm = new FormGroup({
      title: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required),

      tags: new FormControl('', Validators.required)
    });
  }

}
