import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { BannerModel } from 'src/app/shared/models/banner.model';
import { env } from 'src/app/shared/env-consts';
import { AuthService } from './auth.service';


@Injectable()
export class BannerService {


  bannersChanged = new Subject<BannerModel[]>();

  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  getAll() {

    //   // const headers = new HttpHeaders().set('x-auth', this.auService.token);
    const req = this.httpClient.get<BannerModel[]>( 'admin/banners/'  , {
      observe: 'body',
      responseType: 'json',
    //headers
    }) ;
 
    return  req;
  }

   getById(id: string)  {

      // const headers = new HttpHeaders().set('x-auth', this.auService.token);
    const req =this.httpClient.get<BannerModel>('admin/banners/' + id, {
      observe: 'body',
      responseType: 'json',
    //headers
    }) ;

    return req;
  }

  addBanner(banner: BannerModel, file) {
      // const headers = new HttpHeaders().set('x-auth', this.auService.token);
    const body = new FormData();

    body.append('title', banner.title);
    body.append('description', banner.description);
    body.append('link', banner.link);
    body.append('image', file, file.name);

    const req = new HttpRequest('POST','admin/banners/create', body,
    {
    //headers ,
      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  updateBanner(banner: BannerModel, file , id: string) {
      // const headers = new HttpHeaders().set('x-auth', this.auService.token);
    const body = new FormData();
    let req;
    if (file) {
      body.append('title', banner.title);
      body.append('description', banner.description);
      body.append('link', banner.link);
      body.append('image', file, file.name);
      req = new HttpRequest('PATCH','admin/banners/edit/' + id, body,
        {
        //headers,
          reportProgress: true
        });
    } else if (banner.image.length > 0) {
      banner.image = banner.image.slice(env.assestUrl.length , banner.image.length);
      req = new HttpRequest('PATCH','admin/banners/edit/' + id, banner,
        {
        //headers,
          reportProgress: true
        });
    }
    return this.httpClient.request(req);
  }

  deleteBanner(id: string) {
    const req = new HttpRequest('DELETE','admin/banners/remove/' + id, null,
      {
      //headers: new HttpHeaders().set('x-auth', this.auService.token),
        reportProgress: true
      });

    return this.httpClient.request(req);
  }
}
