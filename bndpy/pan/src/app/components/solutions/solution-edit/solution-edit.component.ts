import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SolutionService } from 'src/app/services/solution.service';
import { env } from 'src/app/shared/env-consts';
import { SolutionKindService } from 'src/app/services/solution-kind.service';
import { SolutionKindModel } from 'src/app/shared/models/solution-kind.model';

@Component({
  selector: 'app-solution-edit',
  templateUrl: './solution-edit.component.html',
  styleUrls: ['./solution-edit.component.css']
})
export class SolutionEditComponent implements OnInit {

  solution = { title: '', titleEnglish: '', logo: '', tags: '', kind: '', description: '' };
  kinds: SolutionKindModel[];
  solutionForm: FormGroup;
  editMode = false;
  logoPath;
  imgURL: any;
  message;
  id: string;
  private file;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private soService: SolutionService,
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

    this.solutionForm.patchValue({ logo: this.file.name });


    this.solution.logo = '';

  }

  onBack() {
    if (this.editMode) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {
    console.log(this.solutionForm)
    if (this.editMode) {

      this.soService.updateSolution(this.solutionForm.value, this.file, this.id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {
      this.soService.addSolution(this.solutionForm.value, this.file)
        .subscribe(
          (result) => this.onCancel(),
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.solutionForm.setValue({ title: '', titleEnglish: '', logo: '', tags: '', kind: '' , description: '' });
    this.solution.logo = '';
  }

  setData() {

    if (this.editMode) {
      this.soService.getById(this.id).subscribe((solution) => {

        console.log('solution of get: ', solution);
        this.solution = solution[0];
        this.solution.logo = env.assestUrl + this.solution.logo;
        this.solutionForm.setValue({
          title: this.solution.title,
          titleEnglish: this.solution.titleEnglish,
          description: this.solution.description,
          tags: this.solution.tags,
          kind: this.solution.kind,
          logo: this.solution.logo
        })
      })
    }



  }

  private initForm() {
    this.skService.getAll().subscribe((kinds) => this.kinds = kinds);
    this.solutionForm = new FormGroup({
      title: new FormControl('', Validators.required),
      titleEnglish: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required),
      kind: new FormControl('', Validators.required)
    });
  }


}
