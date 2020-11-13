import { Component, OnInit } from '@angular/core';
import { env } from 'src/app/shared/env-consts';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SolutionKindService } from 'src/app/services/solution-kind.service';

@Component({
  selector: 'app-solution-kind-edit',
  templateUrl: './solution-kind-edit.component.html',
  styleUrls: ['./solution-kind-edit.component.css']
})
export class SolutionKindEditComponent implements OnInit {

  solutionKind = { title: '', logo: '',  tags: '' ,description:''};

  solutionKindForm: FormGroup;
  editMode = false;
  logoPath;
  imgURL: any;
  message;
  id: string;
  private file;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private skService: SolutionKindService) { }

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

    this.solutionKindForm.patchValue({logo : this.file.name})


    this.solutionKind.logo = '';

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
      console.log(this.solutionKindForm)
      this.skService.updateSolutionKind(this.solutionKindForm.value, this.file, this.id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {
      this.skService.addSolutionKind(this.solutionKindForm.value, this.file)
        .subscribe(
          (result) => this.onCancel(),
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.solutionKindForm.setValue({ title: '', logo: '' , tags: '',description:'' });
    this.solutionKind.logo = '';
  }

  setData() {

    if (this.editMode) {
      this.skService.getById(this.id).subscribe((solutionKind) => {

        console.log('solutionKind of get: ', solutionKind);
        this.solutionKind = solutionKind[0];
        this.solutionKind.logo = env.assestUrl + this.solutionKind.logo;
        this.solutionKindForm.setValue({
          title: this.solutionKind.title,
          description:this.solutionKind.description,
          tags: this.solutionKind.tags,
          logo: this.solutionKind.logo
        })
      })
    }



  }

  private initForm() {

    this.solutionKindForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required)
    });
  }


}
