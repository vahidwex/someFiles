import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  GetallApi="solutions"
  getSolutionBySolutionName="getSolutionBySolutionName"
  constructor(
    private http:HttpClient
  ) { }

  header= new HttpHeaders({

  });
    
 
  public GetAll(): Observable<any> {
    
    return this.http.get<any>(this.GetallApi,{headers:this.header})
  }

  public GetSolutionBySolutionName(SolutionName): Observable<any> {
    
    return this.http.get<any>(`${this.getSolutionBySolutionName}/${SolutionName}`,{headers:this.header})
  }
}
