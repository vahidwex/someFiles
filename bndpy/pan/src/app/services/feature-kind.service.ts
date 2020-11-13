import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { FeatureKindModel } from 'src/app/shared/models/feature-kind.model';
import { env } from 'src/app/shared/env-consts';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureKindService {

  featurekindsChanged = new Subject<FeatureKindModel[]>();

  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  getAll() {


    const req = this.httpClient.get<FeatureKindModel[]>( 'admin/featurekinds/'  , {
      observe: 'body',
      responseType: 'json',

    }) ;

    return  req;
  }

   getById(id: string)  {


    const req =this.httpClient.get<FeatureKindModel>('admin/featurekinds/' + id, {
      observe: 'body',
      responseType: 'json',

    }) ;

    return req;
  }

  addFeatureKind(featureKind: FeatureKindModel, file) {

    const body = new FormData();

    body.append('title', featureKind.title);
    body.append('logo', file, file.name);

    const req = new HttpRequest('POST','admin/featurekinds/create', body,
    {

      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  updateFeatureKind(featureKind: FeatureKindModel, file , id: string) {

    const body = new FormData();
    let req;
    if (file) {
      body.append('title', featureKind.title);
      body.append('logo', file, file.name);
      req = new HttpRequest('PATCH','admin/featurekinds/edit/' + id, body,
        {

          reportProgress: true
        });
    } else if (featureKind.logo.length > 0) {
      featureKind.logo = featureKind.logo.slice(env.assestUrl.length , featureKind.logo.length);
      req = new HttpRequest('PATCH','admin/featurekinds/edit/' + id, featureKind,
        {

          reportProgress: true
        });
    }
    return this.httpClient.request(req);
  }

  deleteFeatureKind(id: string) {
    const req = new HttpRequest('DELETE','admin/featurekinds/remove/' + id, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
}
