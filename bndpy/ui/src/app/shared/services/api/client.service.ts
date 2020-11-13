
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

    checkToken="checkToken"
    getByToken="getByToken"

    cerateClient="cerateClient"
    
  constructor(
    private http:HttpClient
  ) { }

  header= new HttpHeaders({

  });
    
  public CerateClient(body): Observable<any> {
    
    return this.http.post<any>(this.cerateClient,{...body},{headers:this.header})
  }

  public CheckToken(token): Observable<boolean> {
    return this.http.post<any>(this.checkToken,{token},{headers:this.header})
  }

  public GetByToken(token): Observable<any> {
    return this.http.post<any>(this.getByToken,{token},{headers:this.header})
  }
}
