import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CapabilityService } from 'src/app/services/capability.service';

import { CapabilityKindService } from 'src/app/services/capability-kind.service';
import { CapabilityKindModel } from 'src/app/shared/models/capability-kind.model';
import { env } from 'src/app/shared/env-consts';

@Component({
  selector: 'app-capability-edit',
  templateUrl: './capability-edit.component.html',
  styleUrls: ['./capability-edit.component.css']
})
export class CapabilityEditComponent implements OnInit {

  capability = { title: '', logo: '', tags: '', kind: '' };
  kinds: CapabilityKindModel[];
  capabilityForm: FormGroup;
  editMode = false;
  logoPath;
  imgURL: any;
  message;
  id: string;
  private file;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private caService: CapabilityService,
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
  private imageSrc: string = '';
  onUpload(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    this.capabilityForm.patchValue({logo : this.imageSrc});
    this.file = e.target.files[0];
    // if (files.length === 0) {
    //   return;
    // }

    // const mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.message = 'Only logos are supported.';
    //   return;
    // }

    // let reader = new FileReader();
    // this.logoPath = files;
    // reader.readAsBinaryString(files[0]);

    // reader.onload = (_event) => {
    //   this.imgURL = reader.result;
    // }
    // this.file = files[0];

    // this.capabilityForm.patchValue({logo : this.file.name});


    // this.capability.logo = '';

  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  }
  onBack(){
    if(this.editMode){
      this.router.navigate(['../../'], { relativeTo: this.route });
    }else{
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {
    console.log(this.capabilityForm)
    if (this.editMode) {

      this.caService.updateCapability(this.capabilityForm.value, this.file, this.id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {
      this.caService.addCapability(this.capabilityForm.value, this.file)
        .subscribe(
          (result) => this.onCancel(),
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.capabilityForm.setValue({ title: '', logo: '', tags: '', kind: '' });
    this.capability.logo = '';
  }

  setData() {

    if (this.editMode) {
      this.caService.getById(this.id).subscribe((capability) => {

        console.log('capability of get: ', capability);
        this.capability = capability[0];
        this.capability.logo = env.assestUrl + this.capability.logo;
        this.capabilityForm.setValue({
          title: this.capability.title,
          tags: this.capability.tags,
          kind: this.capability.kind,
          logo: this.capability.logo
        })
      })
    }



  }

  private initForm() {
    this.ckService.getAll().subscribe((kinds) => this.kinds =kinds);
    this.capabilityForm = new FormGroup({
      title: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required),
      kind: new FormControl('', Validators.required)
    });
  }

}
