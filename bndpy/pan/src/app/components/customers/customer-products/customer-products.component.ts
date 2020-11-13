import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product.model';
import { CustomerService } from 'src/app/services/customer.service';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CustomerModel } from 'src/app/shared/models/customer.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.css']
})
export class CustomerProductsComponent implements OnInit {
  customerProductForm: FormGroup;
  kinds: ProductModel[];
  customerProducts: string[];
  customerId: string;
  constructor(private cuService: CustomerService,
              private prService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.prService.getAll().subscribe((roles) => {
      this.kinds = roles;
    });
    this.route.params.subscribe((params: Params) => {
      this.customerId = params.id;
      this.cuService.getById(params.id).subscribe((customer) => {


        this.customerProducts = customer[0].productsBuyed;

      });
    });

  }

  removeProducts( productId) {


    this.cuService.deleteCustomerProducts(this.customerId,productId).subscribe((result) => {
      const customer = result['body'];


      if (customer) {
        this.customerProducts = customer['result'].productsBuyed;
      }
    });

  }
  onNavigate() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
  onSubmit() {
    const productId = this.customerProductForm.get('kind').value;

    this.cuService.addCustomerProducts(this.customerId, productId).subscribe((result) => {
      const customer = result['body'];
      if (customer) {
        this.customerProducts = customer['result'].productsBuyed;
      }

    });

  }
  private initForm() {

    this.customerProductForm = new FormGroup({
      kind: new FormControl('', Validators.required)
    });
  }
}
