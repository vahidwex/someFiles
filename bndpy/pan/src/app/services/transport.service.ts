import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TransportModel } from '../shared/models/transport.model';


@Injectable()
export class TransportService {

    getById="admin/transport/getById"
    add="admin/transport/create"
    getAll="admin/transport/getAll"
    remove="admin/transport/remove"
    edit="admin/transport/editStatus"

  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  GetById(id) {

    return this.httpClient.get<TransportModel>(`${this.getById}/${id}`,{observe: 'body',responseType: 'json'});

  }
  
  GetAll() {
    return this.httpClient.get<TransportModel[]>(`${this.getAll}`,{observe: 'body',responseType: 'json'});

  }

  Add(transport) {
      console.log(transport)
    return this.httpClient.post<TransportModel[]>(`${this.add}`,transport,{observe: 'body',responseType: 'json'});

  }

  Edit(status:string,id) {
    return this.httpClient.patch<TransportModel[]>(`${this.edit}/${id}`,{status},{reportProgress: true});
  }

  Remove(id) {
    return this.httpClient.delete<TransportModel>(`${this.remove}/${id}`,{reportProgress: true});
  }
  
}
