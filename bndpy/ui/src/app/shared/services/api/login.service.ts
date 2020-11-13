import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  insertLike="insertLike"
  addUiUser="addUiUser"
  checkByToken="checkByToken"
  checkByUserPass="checkByUserPass"
  likedCheck="likedCheck"

  constructor(
    private http:HttpClient
  ) { }
  loggedStatus= new BehaviorSubject(false);
  showStatus = new BehaviorSubject(false);
  header= new HttpHeaders({

  });
    
  
  public CheckByToken(token): Observable<any> {
    //   debugger;
    return this.http.post<any>(this.checkByToken,{token},{headers:this.header})
  }
  
  public CheckByUserPass(userPass): Observable<any> {
    return this.http.post<any>(this.checkByUserPass,userPass,{headers:this.header})
  }

  public AddUiUser(body): Observable<any> {
    return this.http.post<any>(this.addUiUser,body,{headers:this.header})
  }

  public InsertLike(productId,token): Observable<any> {
    return this.http.post<any>(this.insertLike,{productId,token},{headers:this.header})
  }
  public LikedCheck(productId,token=""): Observable<any> {
    let customtoken;
    token==null?customtoken="":customtoken=token;
    // debugger;
    return this.http.post<any>(this.likedCheck,{productId,customtoken},{headers:this.header})
  }
  
}
