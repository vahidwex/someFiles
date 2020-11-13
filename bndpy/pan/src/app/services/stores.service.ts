import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoresModel } from '../shared/models/stores.model';


@Injectable()
export class StoresService {

    getById="admin/stores/getById"
    getAll="admin/stores/getAll"
    create="admin/stores/create"
    remove="admin/stores/remove"
    edit="admin/stores/edit"

    addStoreBanner="admin/stores/addStoreBanner"
    deletestoreBanner="admin/stores/deletestoreBanner"
    editStoreBanner="admin/stores/editStoreBanner"
    
  constructor(private httpClient: HttpClient) { }

  GetById(id) {
    return this.httpClient.get<StoresModel>(`${this.getById}/${id}`,{observe: 'body',responseType: 'json'});
  }
  
  GetAll() {
    return this.httpClient.get<StoresModel[]>(`${this.getAll}`,{observe: 'body',responseType: 'json'});

  }
  
  Create(body:StoresModel,logo) {
    const fd =new FormData()

    fd.append('title', body.title);
    fd.append('productDetailKind', body.productDetailKind);
    fd.append('description', body.description);
    fd.append('logo', logo, logo.name);
    debugger;
    return this.httpClient.post<StoresModel[]>(`${this.create}`,fd,{observe: 'body',responseType: 'json'});

  }

  Edit(body,id,logo) {

    const fd =new FormData()

    fd.append('title', body.title);
    fd.append('productDetailKind', body.productDetailKind);
    fd.append('description', body.description);
    fd.append('logo', logo, logo.name);

    return this.httpClient.patch<StoresModel[]>(`${this.edit}/${id}`,fd,{reportProgress: true});
  }

  Remove(id) {
    return this.httpClient.delete<StoresModel>(`${this.remove}/${id}`,{reportProgress: true});
  }

  RomeveBannerFromStore(bannerId,storeId){
    
    return this.httpClient.patch<StoresModel[]>(`${this.deletestoreBanner}/${bannerId}/${storeId}`,{},{reportProgress: true});
  }
  EditBannerToStore(bannerId,body,image){
    const fd =new FormData()
    fd.append('title', body.title);
    fd.append('desc', body.desc);
    fd.append('image', image, image.name);
    // debugger;
    return this.httpClient.patch<StoresModel[]>(`${this.editStoreBanner}/${bannerId}`,fd,{reportProgress: true});
  }
  AddBannerToStore(storeId,body,image){
    const fd =new FormData()
    fd.append('title', body.title);
    fd.append('desc', body.desc);
    fd.append('image', image, image.name);

    return this.httpClient.patch<StoresModel[]>(`${this.addStoreBanner}/${storeId}`,fd,{reportProgress: true});
  }
  
}
