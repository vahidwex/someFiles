import { Injectable } from '@angular/core';
import { env } from 'src/app/shared/env-consts';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { ProductKindModel } from '../shared/models/product-kind.model';

@Injectable({
  providedIn: 'root'
})
export class ProductKindService {

  ProductKindsChanged = new Subject<ProductKindModel[]>();

  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  getAll() {


    const req = this.httpClient.get<ProductKindModel[]>( 'admin/productKinds/'  , {
      observe: 'body',
      responseType: 'json',

    }) ;

    return  req;
  }

   getById(id: string)  {


    const req =this.httpClient.get<ProductKindModel>('admin/productKinds/' + id, {
      observe: 'body',
      responseType: 'json',

    }) ;

    return req;
  }

  addproductKind(productKind: ProductKindModel, file) {

    const body = new FormData();

    body.append('title', productKind.title);
    body.append('description', productKind.description);
    body.append('tags', productKind.tags);
    if(productKind.fatherProductKind){
      body.append('fatherProductKind', productKind.fatherProductKind);
    }
    
    body.append('logo', file, file.name);

    
    // debugger;
    const req = new HttpRequest('POST','admin/productKinds/create', body,
    {

      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  updateproductKind(productKind: ProductKindModel, file , id: string) {

    const body = new FormData();
    let req;
    if (file) {
      body.append('title', productKind.title);
      body.append('description', productKind.description);
      body.append('tags', productKind.tags);
      body.append('logo', file, file.name);
      if(productKind.fatherProductKind){
        body.append('fatherProductKind', productKind.fatherProductKind);
      }

      req = new HttpRequest('PATCH','admin/productKinds/edit/' + id, body,
        {

          reportProgress: true
        });
    } else if (productKind.logo.length > 0) {
      productKind.logo = productKind.logo.slice(env.assestUrl.length , productKind.logo.length);
      req = new HttpRequest('PATCH','admin/productKinds/edit/' + id, productKind,
        {

          reportProgress: true
        });
    }
    return this.httpClient.request(req);
  }

  deleteproductKind(id: string) {
    const req = new HttpRequest('DELETE','admin/productKinds/remove/' + id, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
}
