import { Injectable } from '@angular/core';
import { SolutionKindModel } from 'src/app/shared/models/solution-kind.model';
import { env } from 'src/app/shared/env-consts';
import { HttpHeaders, HttpRequest, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SolutionKindService {

  solutionKindsChanged = new Subject<SolutionKindModel[]>();

  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  getAll() {


    const req = this.httpClient.get<SolutionKindModel[]>( 'admin/solutionKinds/'  , {
      observe: 'body',
      responseType: 'json',

    }) ;

    return  req;
  }

   getById(id: string)  {


    const req =this.httpClient.get<SolutionKindModel>('admin/solutionKinds/' + id, {
      observe: 'body',
      responseType: 'json',

    }) ;

    return req;
  }

  addSolutionKind(solutionKind: SolutionKindModel, file) {

    const body = new FormData();

    body.append('title', solutionKind.title);
    body.append('description', solutionKind.description);
    body.append('tags', solutionKind.tags);
    body.append('logo', file, file.name);

    const req = new HttpRequest('POST','admin/solutionKinds/create', body,
    {

      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  updateSolutionKind(solutionKind: SolutionKindModel, file , id: string) {

    const body = new FormData();
    let req;
    if (file) {
      body.append('title', solutionKind.title);
      body.append('description', solutionKind.description);
      body.append('tags', solutionKind.tags);
      body.append('logo', file, file.name);
      req = new HttpRequest('PATCH','admin/solutionKinds/edit/' + id, body,
        {

          reportProgress: true
        });
    } else if (solutionKind.logo.length > 0) {
      solutionKind.logo = solutionKind.logo.slice(env.assestUrl.length , solutionKind.logo.length);
      req = new HttpRequest('PATCH','admin/solutionKinds/edit/' + id, solutionKind,
        {

          reportProgress: true
        });
    }
    return this.httpClient.request(req);
  }

  deleteSolutionKind(id: string) {
    const req = new HttpRequest('DELETE','admin/solutionKinds/remove/' + id, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
}
