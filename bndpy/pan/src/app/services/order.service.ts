import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { env } from 'src/app/shared/env-consts';
import { AuthService } from './auth.service';
import { OrderModel } from '../shared/models/order.model';


@Injectable()
export class OrderService {

    getById="admin/order/getById"
    getByStatusOrder="admin/order/getByStatusOrder"
    getAll="admin/order/getAll"
    remove="admin/order/remove"
    editStatus="admin/order/editStatus"
    findManyByIds="admin/order/findManyByIds"
  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  GetById(id,limit=8,skip=0) {

    return this.httpClient.get<OrderModel>(`${this.getById}/${id}?limit=${limit}&skip=${skip}`,{observe: 'body',responseType: 'json'});

  }
  GetByStatusOrder(status,limit=8,skip=0) {

    return this.httpClient.get<OrderModel[]>(`${this.getByStatusOrder}/${status}?limit=${limit}&skip=${skip}`,{observe: 'body',responseType: 'json'});

  }
  GetAll(limit=8,skip=0) {
    return this.httpClient.get<OrderModel[]>(`${this.getAll}?limit=${limit}&skip=${skip}`,{observe: 'body',responseType: 'json'});

  }
  
  FindManyByIds(ids) {
    return this.httpClient.get<OrderModel[]>(`${this.findManyByIds}/${ids}`,{reportProgress: true});
  }

  EditStatus(status:string,id) {
    return this.httpClient.patch<OrderModel[]>(`${this.editStatus}/${id}`,{status},{reportProgress: true});
  }

  Remove(id) {
    return this.httpClient.delete<OrderModel>(`${this.remove}/${id}`,{reportProgress: true});
  }

  
}
