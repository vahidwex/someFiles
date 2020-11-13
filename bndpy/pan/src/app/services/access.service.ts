import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { env } from 'src/app/shared/env-consts';
import { AuthService } from './auth.service';
import { OrderModel } from '../shared/models/order.model';


@Injectable()
export class AccessService {

    checkAccess="admin/users/checkPermission"

  constructor(private httpClient: HttpClient) { }

  CheckAccess(permission) {

    return this.httpClient.get<OrderModel>(`${this.checkAccess}/${permission}`,{observe: 'body',responseType: 'json'});

  }
  

  
}
