import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductDetailsKindService } from 'src/app/services/productDetailsKind.service';

@Component({
  selector: 'app-product-details-kind-edit',
  templateUrl: './product-details-kind-edit.component.html',
  styleUrls: ['./product-details-kind-edit.component.css']
})
export class ProductDetailsKindEditComponent implements OnInit {

  prodKinds = { title: ''};

  ProductDetailsKindForm: FormGroup;
  editMode = false;
  logoPath;
  imgURL: any;
  message;
  id: string;
  private file;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private rlService: ProductDetailsKindService) { }

  ngOnInit() {

    this.id = this.route.snapshot.params.id;
    this.initForm();


    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
          this.editMode = params.id != null;
          if(params.id){
            this.setData();

          }
        }
      );

  }



  onBack(){
    if(this.editMode){
      this.router.navigate(['../../'], { relativeTo: this.route });
    }else{
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {
    console.log(this.editMode)
    if (this.editMode) {
      this.rlService.Edit(this.ProductDetailsKindForm.value , this.id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {
      this.rlService.Create(this.ProductDetailsKindForm.value )
        .subscribe(
          (result) => this.onCancel(),
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.ProductDetailsKindForm.setValue({ title: '' });

  }

  setData() {

    if (this.editMode) {
      this.rlService.GetById(this.id).subscribe((prodKinds) => {

        // console.log('role of get: ', role);
        // this.prodKinds = prodKinds;


        this.ProductDetailsKindForm.setValue({
          title: prodKinds[0].title,

        })
      })
    }



  }

  private initForm() {

    this.ProductDetailsKindForm = new FormGroup({
      title: new FormControl('', Validators.required),

    });
  }

}
