import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { CapabilityModel } from 'src/app/shared/models/capability.model';
import { env } from 'src/app/shared/env-consts';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CapabilityService {

  capabilitysChanged = new Subject<CapabilityModel[]>();

  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  getAll() {


    const req = this.httpClient.get<CapabilityModel[]>( 'admin/capabilities/'  , {
      observe: 'body',
      responseType: 'json',

    }) ;

    return  req;
  }

   getById(id: string)  {


    const req =this.httpClient.get<CapabilityModel>('admin/capabilities/' + id, {
      observe: 'body',
      responseType: 'json',

    }) ;

    return req;
  }

  addCapability(capability: CapabilityModel, file) {

    const body = new FormData();

    body.append('title', capability.title);
    body.append('tags', capability.tags);
    body.append('kind', capability.kind);
    body.append('logo', file, file.name);

    const req = new HttpRequest('POST','admin/capabilities/create', body,
    {

      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  updateCapability(capability: CapabilityModel, file , id: string) {

    const body = new FormData();
    let req;
    if (file) {
      body.append('title', capability.title);
      body.append('tags', capability.tags);
      body.append('kind', capability.kind);
      body.append('logo', file, file.name);
      req = new HttpRequest('PATCH','admin/capabilities/edit/' + id, body,
        {

          reportProgress: true
        });
    } else if (capability.logo.length > 0) {
      capability.logo = capability.logo.slice(env.assestUrl.length , capability.logo.length);
      req = new HttpRequest('PATCH','admin/capabilities/edit/' + id, capability,
        {

          reportProgress: true
        });
    }
    return this.httpClient.request(req);
  }

  deleteCapability(id: string) {
    const req = new HttpRequest('DELETE','admin/capabilities/remove/' + id, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
}
