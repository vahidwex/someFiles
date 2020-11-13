import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductDetailsService } from 'src/app/services/productDetails.service';
import { ProductDetailsKindService } from 'src/app/services/productDetailsKind.service';
import { ProductDetailsModel } from 'src/app/shared/models/productDetails.model';
import { ProductDetailsKindModel } from 'src/app/shared/models/productDetailsKind.modelt';


@Component({
  selector: 'app-product-details-edit',
  templateUrl: './product-details-edit.component.html',
  styleUrls: ['./product-details-edit.component.css']
})
export class ProductDetailsEditComponent implements OnInit {

  prodKinds = { desc: '',productDetailsKind:''};

  ProductDetailsForm: FormGroup;
  editMode = false;
  logoPath;
  imgURL: any;
  message;
  id: string;
  private file;
  ProductDetails:ProductDetailsKindModel[]=[]
  ProductDetailsKinds: ProductDetailsKindModel[]=[];
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private rlService: ProductDetailsService,
              private PDKservice: ProductDetailsKindService) { }

  ngOnInit() {
    this.GetPDKs();
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
      this.rlService.Edit(this.ProductDetailsForm.value , this.id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {
      this.rlService.Create(this.ProductDetailsForm.value )
        .subscribe(
          (result) => this.onCancel(),
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.ProductDetailsForm.setValue({ desc: '',productDetailsKind:'' });

  }

  setData() {

    if (this.editMode) {
      this.rlService.GetById(this.id).subscribe((prodKinds) => {

        // console.log('role of get: ', role);
        this.ProductDetails = prodKinds[0].productDetailsKind;
        // this.ProductDetailsForm.patchValue

        this.ProductDetailsForm.patchValue({
          desc: prodKinds[0].desc,
          productDetailsKind:prodKinds[0].productDetailsKind

        })
        
      })
    }



  }
  getbyid(){
    this.rlService.GetById(this.id).subscribe((prodKinds) => {
      this.ProductDetails = prodKinds[0].productDetailsKind;

      this.ProductDetailsForm.patchValue({
        desc: prodKinds[0].desc,
        productDetailsKind:prodKinds[0].productDetailsKind

      })
     
    })
  }
  private initForm() {

    this.ProductDetailsForm = new FormGroup({
      desc: new FormControl('', Validators.required),
      productDetailsKind: new FormControl('', Validators.required),

    });
  }

  private GetPDKs(){
    this.PDKservice.GetAll().subscribe( (result: ProductDetailsKindModel[]) => {
      this.ProductDetailsKinds = result ;

      // this.PDKservice.userChange.next(this.users.find(obj => obj._id === this.id));
    })
  }

}
