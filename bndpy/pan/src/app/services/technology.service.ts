import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TechnologyModel } from 'src/app/shared/models/technology.model';
import { env } from 'src/app/shared/env-consts';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  technologiesChanged = new Subject<TechnologyModel[]>();

  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  getAll() {


    const req = this.httpClient.get<TechnologyModel[]>( 'admin/technologies/'  , {
      observe: 'body',
      responseType: 'json',

    }) ;

    return  req;
  }

   getById(id: string)  {


    const req =this.httpClient.get<TechnologyModel>('admin/technologies/' + id, {
      observe: 'body',
      responseType: 'json',

    }) ;

    return req;
  }

  addTechnology(technology: TechnologyModel, file) {

    const body = new FormData();

    body.append('title', technology.title);
    body.append('kind', technology.kind);
    body.append('description', technology.description);
    body.append('wikiLink', technology.wikiLink);
    body.append('image', file, file.name);

    const req = new HttpRequest('POST','admin/technologies/create', body,
    {

      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  updateTechnology(technology: TechnologyModel, file , id: string) {

    const body = new FormData();
    let req;
    if (file) {
      body.append('title', technology.title);
      body.append('kind', technology.kind);
      body.append('description', technology.description);
      body.append('wikiLink', technology.wikiLink);
      body.append('image', file, file.name);
      req = new HttpRequest('PATCH','admin/technologies/edit/' + id, body,
        {

          reportProgress: true
        });
    } else if (technology.image.length > 0) {
      technology.image = technology.image.slice(env.assestUrl.length , technology.image.length);
      req = new HttpRequest('PATCH','admin/technologies/edit/' + id, technology,
        {

          reportProgress: true
        });
    }
    return this.httpClient.request(req);
  }

  deleteTechnology(id: string) {
    const req = new HttpRequest('DELETE','admin/technologies/remove/' + id, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
}
