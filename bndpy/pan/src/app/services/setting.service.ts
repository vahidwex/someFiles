import { Subject } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { SettingModel } from 'src/app/shared/models/setting.model';
import { env } from 'src/app/shared/env-consts';
import { AuthService } from './auth.service';


@Injectable()
export class SettingService {


  settingChanged = new Subject<SettingModel[]>();

  constructor(private httpClient: HttpClient, private auService: AuthService) { }

  getAll() {


    const req = this.httpClient.get<SettingModel[]>('admin/setting/', {
      observe: 'body',
      responseType: 'json',

    });

    return req;
  }


  addSetting(setting: SettingModel, file,bg) {

    console.log('setting')
    console.log(setting)

    const body = new FormData();

    body.append('logo', file, file.name);
    body.append('backGround',file,bg.name);
    body.append('companyName', setting.companyName);
    body.append('email', setting.email);
    body.append('tel', setting.tel);
    body.append('fax', setting.fax);
    body.append('HeaderMessage',setting.HeaderMessage);
    body.append('productHeader',setting.productHeader);
    body.append('educationalSources',setting.educationalSources);
    body.append('subeducationalSources',setting.subeducationalSources);
    body.append('customers',setting.customers);
    body.append('abutUsFooter',setting.abutUsFooter);
    body.append('abutUsPage', setting.abutUsPage);

    body.append('footersecoundColumn',setting.footersecoundColumn);
    body.append('footerFirstCoumn',setting.footerFirstCoumn);
    body.append('footerthirdColumn',setting.footerthirdColumn);
    body.append('location',setting.location);
    body.append('downFooterText',setting.downFooterText);
    body.append('solutionHeader',setting.solutionHeader);

    
    const req = new HttpRequest('POST', 'admin/setting/create', body,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  updateSetting(setting: SettingModel, file,bg, id: string) {

    const body = new FormData();
    let req;
    

    if (file) {
      body.append('logo', file, file.name);
      body.append('backGround',bg,bg.name);
      body.append('companyName', setting.companyName);
      body.append('email', setting.email);
      body.append('tel', setting.tel);
      body.append('abutUsPage', setting.abutUsPage);

      body.append('fax', setting.fax);
      body.append('HeaderMessage',setting.HeaderMessage);
      body.append('productHeader',setting.productHeader);
      body.append('educationalSources',setting.educationalSources);
      body.append('subeducationalSources',setting.subeducationalSources);
      body.append('customers',setting.customers);
      body.append('abutUsFooter',setting.abutUsFooter);
      body.append('footersecoundColumn',setting.footersecoundColumn);
      body.append('footerFirstCoumn',setting.footerFirstCoumn);
      body.append('footerthirdColumn',setting.footerthirdColumn);
      body.append('location',setting.location);
      body.append('downFooterText',setting.downFooterText);
      body.append('solutionHeader',setting.solutionHeader);
      

      console.log('setting')
      console.log(setting)


      req = new HttpRequest('PATCH', 'admin/setting/edit/' + id, body,
        {

          reportProgress: true
        });
    } else if (setting.logo.length > 0) {

      req = new HttpRequest('PATCH', 'admin/setting/edit/' + id, setting,
        {

          reportProgress: true
        });
    }
    return this.httpClient.request(req);
  }

  deleteSettingAddress(addressId) {
    const req = new HttpRequest('POST', 'admin/setting/removeAddress/' + addressId, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  addSettingAddress(settingId, addressItem) {
    const req = new HttpRequest('POST', 'admin/setting/addAddress/' + settingId, addressItem,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
  deleteSettingSocialNetwork(socialNetworkId) {
    const req = new HttpRequest('POST', 'admin/setting/removeSocialNetworks/' + socialNetworkId, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  addSettingSocialNetwork(socialNetworkItem, settingId, fileIcon) {

    const body = new FormData();


    body.append('link', socialNetworkItem.link);
    body.append('title', socialNetworkItem.title);
    body.append('socialLogo', fileIcon, fileIcon.name);

    const req = new HttpRequest('POST', 'admin/setting/addSocialNetworks/' + settingId, body,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
}
