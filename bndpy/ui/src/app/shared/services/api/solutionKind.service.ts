import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolutionKindService {

  GetallApi="getsolutionKind"
  getSolutionKindByName="getSolutionKindByName"
  constructor(
    private http:HttpClient
  ) { }

  header= new HttpHeaders({

  });
    
 
  public GetAll(): Observable<any> {
    
    return this.http.get<any>(this.GetallApi,{headers:this.header})
  }

  public GetSolutionKindByName(name): Observable<any> {
    
    return this.http.get<any>(`${this.getSolutionKindByName}/${name}`,{headers:this.header})
  }

  
}
