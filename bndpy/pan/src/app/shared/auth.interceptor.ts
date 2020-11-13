import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { env } from './env-consts';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    // const copiedReq = req.clone({headers: req.headers.set('', '')});
    // tslint:disable-next-line: max-line-length
    const newUrl = env.apiUrl + req.url;

    let token=localStorage.getItem("tokenUser");
    let copiedReq
    // debugger;
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
    // return null;
  }
}
