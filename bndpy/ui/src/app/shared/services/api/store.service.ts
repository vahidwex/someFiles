
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  getStores="getStores"
    
  constructor(
    private http:HttpClient
  ) { }

  header= new HttpHeaders({

  });
    
  public GetStores(): Observable<any> {
    
    return this.http.get<any>(this.getStores,{headers:this.header})
  }


}
