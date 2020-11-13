import { Subject } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { CustomerModel } from 'src/app/shared/models/customer.model';
import { env } from 'src/app/shared/env-consts';
import { AuthService } from './auth.service';


@Injectable()
export class CustomerService {


  customersChanged = new Subject<CustomerModel[]>();

  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  getAll() {


    const req = this.httpClient.get<CustomerModel[]>( 'admin/customers/'  , {
      observe: 'body',
      responseType: 'json',

    }) ;

    return  req;
  }

   getById(id: string)  {


    const req =this.httpClient.get<CustomerModel>('admin/customers/' + id, {
      observe: 'body',
      responseType: 'json',

    }) ;

    return req;
  }

  addCustomer(customer: CustomerModel, file) {

    const body = new FormData();

    body.append('title', customer.title);
    body.append('email', customer.email);
    body.append('tel', customer.tel);
    body.append('site', customer.site);
    body.append('logo', file, file.name);
    body.append('manager', customer.manager);

    const req = new HttpRequest('POST','admin/customers/create', body,
    {

      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  updateCustomer(customer: CustomerModel, file , id: string) {

    const body = new FormData();
    let req;
    if (file) {
      body.append('title', customer.title);
      body.append('email', customer.email);
      body.append('tel', customer.tel);
      body.append('site', customer.site);
      body.append('manager', customer.manager);

      body.append('logo', file, file.name);
      req = new HttpRequest('PATCH','admin/customers/edit/' + id, body,
        {

          reportProgress: true
        });
    } else if (customer.logo.length > 0) {
      customer.logo = customer.logo.slice(env.assestUrl.length , customer.logo.length);
      req = new HttpRequest('PATCH','admin/customers/edit/' + id, customer,
        {

          reportProgress: true
        });
    }
    return this.httpClient.request(req);
  }

  deleteCustomer(id: string) {
    const req = new HttpRequest('DELETE','admin/customers/remove/' + id, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  deleteCustomerProducts(customerId: string,productId: string){
    const req = new HttpRequest('POST','admin/customers/removeProduct/' + customerId,  {productId: productId} ,
    {

      reportProgress: true
    });

  return this.httpClient.request(req);
  }

  addCustomerProducts(customerId,productId){
    const req = new HttpRequest('POST','admin/customers/addProduct/' + customerId, {productId: productId},
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }


}


