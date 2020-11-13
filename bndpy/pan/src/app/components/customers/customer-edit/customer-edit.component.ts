import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

import { env } from 'src/app/shared/env-consts';
import { CustomerModel } from 'src/app/shared/models/customer.model';



@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customer ={ title: '', logo: '', manager: '', site: '' ,email :'',tel : ''};

  customerForm: FormGroup;
  editMode = false;
  logoPath;
  imgURL: any;
  message;
  id: string;
  private file;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private cuService: CustomerService) { }

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

    this.customerForm.patchValue({logo : this.file.name});


    this.customer.logo = ''  ;
    

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
      console.log(this.customerForm)
      this.cuService.updateCustomer(this.customerForm.value, this.file, this.id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {
      this.cuService.addCustomer(this.customerForm.value, this.file)
        .subscribe(
          (result) => this.onCancel(),
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.customerForm.setValue({ title: '', logo: '', manager: '', site: '' ,email :'',tel : ''});
    this.customer.logo = '';
  }

  setData() {

    if (this.editMode) {
      this.cuService.getById(this.id).subscribe((customer) => {

        console.log('customer of get: ', customer);
        this.customer = customer[0];
        this.customer.logo = env.assestUrl + this.customer.logo;
        this.customerForm.setValue({
          title: this.customer.title,
          manager: this.customer.manager,
          site: this.customer.site,
          tel: this.customer.tel,
          email: this.customer.email,
          logo: this.customer.logo
        })
      })
    }



  }

  private initForm() {

    this.customerForm = new FormGroup({
      title: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required),
      manager: new FormControl('', Validators.required),
      site: new FormControl('', Validators.required),
      tel: new FormControl(''),
      email: new FormControl('' )
    });
  }


}

