import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Params, ActivatedRoute, Router } from '@angular/router';
import { TechnologyKindService } from 'src/app/services/technology-kind.service';
import { env } from 'src/app/shared/env-consts';

@Component({
  selector: 'app-technology-kind-edit',
  templateUrl: './technology-kind-edit.component.html',
  styleUrls: ['./technology-kind-edit.component.css']
})
export class TechnologyKindEditComponent implements OnInit {

  technologyKind = { title: '', logo: ''   };

  technologyKindForm: FormGroup;
  editMode = false;
  logoPath;
  imgURL: any;
  message;
  id: string;
  private file;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private ckService: TechnologyKindService) { }

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

    this.technologyKindForm.patchValue({logo : this.file.name})


    this.technologyKind.logo = '';

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
      console.log(this.technologyKindForm)
      this.ckService.updateTechnologyKind(this.technologyKindForm.value, this.file, this.id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {
      this.ckService.addTechnologyKind(this.technologyKindForm.value, this.file)
        .subscribe(
          (result) => this.onCancel(),
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.technologyKindForm.setValue({ title: '', logo: ''   });
    this.technologyKind.logo = '';
  }

  setData() {

    if (this.editMode) {
      this.ckService.getById(this.id).subscribe((technologyKind) => {


        this.technologyKind = technologyKind[0];
        this.technologyKind.logo = env.assestUrl + this.technologyKind.logo;
        this.technologyKindForm.setValue({
          title: this.technologyKind.title,
          logo: this.technologyKind.logo
        });
      });
    }



  }

  private initForm() {

    this.technologyKindForm = new FormGroup({
      title: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required),


    });
  }

}
