import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TechnologyService } from 'src/app/services/technology.service';
import { env } from 'src/app/shared/env-consts';
import { TechnologyKindService } from 'src/app/services/technology-kind.service';
import { TechnologyKindModel } from 'src/app/shared/models/technology-kind.model';
@Component({
  selector: 'app-technology-edit',
  templateUrl: './technology-edit.component.html',
  styleUrls: ['./technology-edit.component.css']
})
export class TechnologyEditComponent implements OnInit {

  technology = { title: '', image: '', description: '', kind: '' ,wikiLink : ''};
  kinds: TechnologyKindModel[];
  technologyForm: FormGroup;
  editMode = false;
  imagePath;
  imgURL: any;
  message;
  id: string;
  private file;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private teService: TechnologyService,
              private tkService: TechnologyKindService) { }

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

    this.technologyForm.patchValue({image : this.file.name});


    this.technology.image = '';

  }

  onBack(){
    if(this.editMode){
      this.router.navigate(['../../'], { relativeTo: this.route });
    }else{
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {
    console.log(this.technologyForm)
    if (this.editMode) {

      this.teService.updateTechnology(this.technologyForm.value, this.file, this.id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {
      this.teService.addTechnology(this.technologyForm.value, this.file)
        .subscribe(
          (result) => this.onCancel(),
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.technologyForm.setValue({ title: '', image: '', description: '', kind: '',wikiLink :'' });
    this.technology.image = '';
  }

  setData() {

    if (this.editMode) {
      this.teService.getById(this.id).subscribe((technology) => {

        console.log('technology of get: ', technology);
        this.technology = technology[0];
        this.technology.image = env.assestUrl + this.technology.image;
        this.technologyForm.setValue({
          title: this.technology.title,
          description: this.technology.description,
          kind: this.technology.kind,
          image: this.technology.image,
          wikiLink: this.technology.wikiLink
        })
      })
    }



  }

  private initForm() {
    this.tkService.getAll().subscribe((kinds) => this.kinds =kinds);
    this.technologyForm = new FormGroup({
      title: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      kind: new FormControl('', Validators.required),
      wikiLink: new FormControl('', Validators.required)
    });
  }
}
