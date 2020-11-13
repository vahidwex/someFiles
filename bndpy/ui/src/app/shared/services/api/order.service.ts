import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  cerateOrder="cerateOrder"
  updateTransport="updateTransport"
  constructor(
    private http:HttpClient
  ) { }

  header= new HttpHeaders({

  });
    
  CerateOrder(products,client,discount=""){

    return this.http.post<any>(this.cerateOrder,{products,client,discount},{headers:this.header})
  }

  UpdateTransport(orderId,transportId){

    return this.http.post<any>(`${this.updateTransport}/${orderId}`,{transportId},{headers:this.header})
  }
  
}
