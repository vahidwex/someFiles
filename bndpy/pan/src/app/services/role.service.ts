import { Subject } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { RoleModel } from 'src/app/shared/models/role.model';

import { RoleAccessModel } from 'src/app/shared/models/role-access.model';
import { AuthService } from './auth.service';


@Injectable()
export class RoleService {


  rolesChanged = new Subject<RoleModel[]>();
  roleChanged = new Subject<RoleAccessModel[]>();
  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  getAll() {


    const req = this.httpClient.get<RoleModel[]>( 'admin/roles/', {
      observe: 'body',
      responseType: 'json',

    });

    return req;
  }

  getById(id: string) {


    const req = this.httpClient.get<RoleModel>( 'admin/roles/' + id, {
      observe: 'body',
      responseType: 'json',

    });

    return req;
  }

  addRole(role: RoleModel) {

    const req = new HttpRequest('POST','admin/roles/create', role,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  updateRole(role: RoleModel, id: string) {


    let req;

    req = new HttpRequest('POST','admin/roles/edit/' + id, role,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  deleteRole(id: string) {
    console.log(id);

    const req = new HttpRequest('DELETE','admin/roles/remove/' + id, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  modifyAccess(id: string, status: boolean) {

    console.log(status);

    let req;

    req = new HttpRequest('POST','admin/roles/accessModify/' + id, { isAuthorized : status },
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
}
