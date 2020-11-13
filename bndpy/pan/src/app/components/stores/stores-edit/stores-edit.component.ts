import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductKindService } from 'src/app/services/product-kind.service';
import { ProductDetailsKindService } from 'src/app/services/productDetailsKind.service';
import { StoresService } from 'src/app/services/stores.service';
import { ProductKindModel } from 'src/app/shared/models/product-kind.model';
import { ProductDetailsKindModel } from 'src/app/shared/models/productDetailsKind.modelt';

@Component({
  selector: 'app-stores-edit',
  templateUrl: './stores-edit.component.html',
  styleUrls: ['./stores-edit.component.css']
})
export class StoresEditComponent implements OnInit {

  productKinds:ProductKindModel[];
  filePath: string;
  editMode = false;
  iconURL: string | ArrayBuffer;
  private fileFile;
prodKinds = { title: '',productKind:'',description:'',logo:'' };

ProductDetailsKindForm: FormGroup;

logoPath;
imgURL: any;
message;
id: string;
private file;


constructor(private route: ActivatedRoute,
            private router: Router,
            private rlService: StoresService,
            private PDKservice:ProductDetailsKindService,
            private productKindservice:ProductKindService) { }

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
  // console.log(this.editMode)
  if (this.editMode) {
    this.rlService.Edit(this.ProductDetailsKindForm.value , this.id,this.fileFile)
      .subscribe(
        (result) => this.onBack(),
        (error) => console.log(error)
      );
  } else {
    this.rlService.Create(this.ProductDetailsKindForm.value,this.fileFile )
      .subscribe(
        (result) => this.onCancel(),
        (error) => console.log(error)
      );
  }

}

private GetPDKs(){
  this.productKindservice.getAll().subscribe( (result: ProductKindModel[]) => {
    this.productKinds = result ;

    // this.PDKservice.userChange.next(this.users.find(obj => obj._id === this.id));
  })
}

onCancel() {
  this.ProductDetailsKindForm.setValue({ title: '',productKind:'',description:'',logo:'' });

}

onUploadFile(files) {

  if (files.length === 0) {
    return;
  }



  let reader = new FileReader();
  this.filePath = files;
  reader.readAsDataURL(files[0]);


  this.fileFile =files[0];

  this.ProductDetailsKindForm.patchValue({ logo: files[0].name })


  // this.educationalSource.file = '';
}
setData() {
    // console.log(this.editMode)
  if (this.editMode) {
    this.rlService.GetById(this.id).subscribe((prodKinds) => {

      // console.log('role of get: ', role);
      // this.prodKinds = prodKinds;
      console.log(prodKinds)

      this.ProductDetailsKindForm.setValue({
        title: prodKinds[0].title,
        productKind: prodKinds[0].productKind,
        description: prodKinds[0].description,
        logo: prodKinds[0].logo,
      })
    })
  }



}

private initForm() {

  this.ProductDetailsKindForm = new FormGroup({
    title: new FormControl('', Validators.required),
    productKind: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    logo: new FormControl('', Validators.required)
  });
}

}
