import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { env } from '../../../value/inv-consts';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    const newUrl = env.apiUrl + req.url;

    let token=localStorage.getItem("tokenUser");
    let copiedReq

    if(token){
      
      copiedReq= req.clone({
        headers: req.headers.set('x-auth', token),
        url: req.url.replace(req.url, newUrl)
      });
    }else{
      
      copiedReq= req.clone({
        url: req.url.replace(req.url, newUrl)
      });
    }
    
    return next.handle(copiedReq);

  }
}
