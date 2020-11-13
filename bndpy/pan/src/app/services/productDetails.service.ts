import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetailsModel } from '../shared/models/productDetails.model';



@Injectable()
export class ProductDetailsService {

    getById="admin/productDetails/getById"
    getAll="admin/productDetails/getAll"
    create="admin/productDetails/create"

    remove="admin/productDetails/remove"
    edit="admin/productDetails/edit"
    removePDK="admin/productDetails/removePDK"
  constructor(private httpClient: HttpClient) { }

  GetById(id) {

    return this.httpClient.get<ProductDetailsModel>(`${this.getById}/${id}`,{observe: 'body',responseType: 'json'});

  }
  
  GetAll() {
    return this.httpClient.get<ProductDetailsModel[]>(`${this.getAll}`,{observe: 'body',responseType: 'json'});

  }
  
  RemovePDK(body){
    return this.httpClient.post<ProductDetailsModel>(`${this.removePDK}`,body,{observe: 'body',responseType: 'json'});
  }
  Create(body:ProductDetailsModel) {
    return this.httpClient.post<ProductDetailsModel[]>(`${this.create}`,body,{observe: 'body',responseType: 'json'});

  }

  Edit(body:ProductDetailsModel,id) {
    return this.httpClient.patch<ProductDetailsModel[]>(`${this.edit}/${id}`,body,{reportProgress: true});
  }

  Remove(id) {
    return this.httpClient.delete<ProductDetailsModel>(`${this.remove}/${id}`,{reportProgress: true});
  }

  
}
