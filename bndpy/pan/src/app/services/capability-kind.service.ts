import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { CapabilityKindModel } from 'src/app/shared/models/capability-kind.model';
import { env } from 'src/app/shared/env-consts';
import { AuthService } from './auth.service';


@Injectable()
export class CapabilityKindService {


  capabilitykindsChanged = new Subject<CapabilityKindModel[]>();

  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  getAll() {


    const req = this.httpClient.get<CapabilityKindModel[]>( 'admin/capabilitykinds/'  , {
      observe: 'body',
      responseType: 'json',

    }) ;

    return  req;
  }

   getById(id: string)  {


    const req =this.httpClient.get<CapabilityKindModel>('admin/capabilitykinds/' + id, {
      observe: 'body',
      responseType: 'json',

    }) ;

    return req;
  }

  addCapabilityKind(banner: CapabilityKindModel, file) {

    const body = new FormData();

    body.append('title', banner.title);
    body.append('tags', banner.tags);
    body.append('logo', file, file.name);

    const req = new HttpRequest('POST','admin/capabilitykinds/create', body,
    {
      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  updateCapabilityKind(banner: CapabilityKindModel, file , id: string) {

    const body = new FormData();
    let req;
    if (file) {
      body.append('title', banner.title);
      body.append('tags', banner.tags);
      body.append('logo', file, file.name);
      req = new HttpRequest('PATCH','admin/capabilitykinds/edit/' + id, body,
        {

          reportProgress: true
        });
    } else if (banner.logo.length > 0) {
      banner.logo = banner.logo.slice(env.assestUrl.length , banner.logo.length);
      req = new HttpRequest('PATCH','admin/capabilitykinds/edit/' + id, banner,
        {
            reportProgress: true
        });
    }
    return this.httpClient.request(req);
  }

  deleteCapabilityKind(id: string) {
    const req = new HttpRequest('DELETE','admin/capabilitykinds/remove/' + id, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
}
