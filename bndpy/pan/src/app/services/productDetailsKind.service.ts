import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';


import { ProductDetailsKindModel } from '../shared/models/productDetailsKind.modelt';


@Injectable()
export class ProductDetailsKindService {

    getById="admin/productDetailsKind/getById"
    getAll="admin/productDetailsKind/getAll"
    create="admin/productDetailsKind/create"

    remove="admin/productDetailsKind/remove"
    edit="admin/productDetailsKind/edit"
    
  constructor(private httpClient: HttpClient) { }

  GetById(id) {

    return this.httpClient.get<ProductDetailsKindModel>(`${this.getById}/${id}`,{observe: 'body',responseType: 'json'});

  }
  
  GetAll() {
    return this.httpClient.get<ProductDetailsKindModel[]>(`${this.getAll}`,{observe: 'body',responseType: 'json'});

  }
  
  Create(body:ProductDetailsKindModel) {
    return this.httpClient.post<ProductDetailsKindModel[]>(`${this.create}`,body,{observe: 'body',responseType: 'json'});

  }

  Edit(body:string,id) {
    return this.httpClient.patch<ProductDetailsKindModel[]>(`${this.edit}/${id}`,body,{reportProgress: true});
  }

  Remove(id) {
    return this.httpClient.delete<ProductDetailsKindModel>(`${this.remove}/${id}`,{reportProgress: true});
  }

  
}
