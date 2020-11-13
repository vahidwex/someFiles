import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {
  BaseUrl="http://localhost:3000"

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let tokenSender = req.clone({
          url: `${this.BaseUrl}/${req.url}`
        }
      );
      return next.handle(tokenSender);
    
  }
}
