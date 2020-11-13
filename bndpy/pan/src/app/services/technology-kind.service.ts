import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { TechnologyKindModel } from 'src/app/shared/models/technology-kind.model';
import { env } from 'src/app/shared/env-consts';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TechnologyKindService {

  technologykindsChanged = new Subject<TechnologyKindModel[]>();

  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  getAll() {


    const req = this.httpClient.get<TechnologyKindModel[]>( 'admin/technologykinds/'  , {
      observe: 'body',
      responseType: 'json',

    }) ;

    return  req;
  }

   getById(id: string)  {


    const req =this.httpClient.get<TechnologyKindModel>('admin/technologykinds/' + id, {
      observe: 'body',
      responseType: 'json',

    }) ;

    return req;
  }

  addTechnologyKind(banner: TechnologyKindModel, file) {

    const body = new FormData();

    body.append('title', banner.title);
    body.append('logo', file, file.name);

    const req = new HttpRequest('POST','admin/technologykinds/create', body,
    {

      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  updateTechnologyKind(banner: TechnologyKindModel, file , id: string) {

    const body = new FormData();
    let req;
    if (file) {
      body.append('title', banner.title);
      body.append('logo', file, file.name);
      req = new HttpRequest('PATCH','admin/technologykinds/edit/' + id, body,
        {

          reportProgress: true
        });
    } else if (banner.logo.length > 0) {
      banner.logo = banner.logo.slice(env.assestUrl.length , banner.logo.length);
      req = new HttpRequest('PATCH','admin/technologykinds/edit/' + id, banner,
        {

          reportProgress: true
        });
    }
    return this.httpClient.request(req);
  }

  deleteTechnologyKind(id: string) {
    const req = new HttpRequest('DELETE','admin/technologykinds/remove/' + id, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
}
