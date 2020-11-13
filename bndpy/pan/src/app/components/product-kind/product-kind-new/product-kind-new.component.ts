import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { env } from 'src/app/shared/env-consts';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { ProductKindService } from 'src/app/services/product-kind.service';
import { ProductKindModel } from 'src/app/shared/models/product-kind.model';

@Component({
  selector: 'app-product-kind-new',
  templateUrl: './product-kind-new.component.html',
  styleUrls: ['./product-kind-new.component.css']
})
export class ProductKindNewComponent implements OnInit {

  productKind = { title: '', logo: '',  tags: '' ,description:'',fatherProductKind:''};

  productKindForm: FormGroup;
  editMode = false;
  logoPath;
  imgURL: any;
  message;
  id: string;
  private file;
  productKinds: ProductKindModel[];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private skService: ProductKindService,) { }

  ngOnInit() {
    this.getProductKinds();
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

    this.productKindForm.patchValue({logo : this.file.name})


    this.productKind.logo = '';

  }

getProductKinds(){
    this.skService.getAll().subscribe( (result: ProductKindModel[]) => {
      console.log(result)
      this.productKinds=result ;

    })
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
      console.log(this.productKindForm)
      this.skService.updateproductKind(this.productKindForm.value, this.file, this.id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {
      this.skService.addproductKind(this.productKindForm.value, this.file)
        .subscribe(
          (result) => this.onCancel(),
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.productKindForm.setValue({ title: '', logo: '' , tags: '',description:'',fatherProductKind:'' });
    this.productKind.logo = '';
  }

  setData() {

    if (this.editMode) {
      this.skService.getById(this.id).subscribe((solutionKind) => {

        console.log('solutionKind of get: ', solutionKind);
        this.productKind = solutionKind[0];
        this.productKind.logo = env.assestUrl + this.productKind.logo;
        this.productKindForm.setValue({
          title: this.productKind.title,
          description:this.productKind.description,
          fatherProductKind:this.productKind.fatherProductKind,
          tags: this.productKind.tags,
          logo: this.productKind.logo
        })
      })
    }



  }

  private initForm() {

    this.productKindForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      fatherProductKind: new FormControl(''),      
      logo: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required)
    });
  }

}
