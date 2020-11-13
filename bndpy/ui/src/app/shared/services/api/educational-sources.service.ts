

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationalSourcesService {

  GetallApi="GetaAllEducationalSources"
  getEsByProductId="getEsByProductId"
  
  constructor(
    private http:HttpClient
  ) { }

  header= new HttpHeaders({

  });
    
 
  public GetAll(): Observable<any> {
    
    return this.http.get<any>(this.GetallApi,{headers:this.header})
  }

  public GetEsByProductId(prodId): Observable<any> {
    
    return this.http.get<any>(`${this.getEsByProductId}/${prodId}`,{headers:this.header})
  }
}
