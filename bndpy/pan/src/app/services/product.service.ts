import { Subject } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { ProductModel } from 'src/app/shared/models/product.model';
import { env } from 'src/app/shared/env-consts';
import { AuthService } from './auth.service';


@Injectable()
export class ProductService {

  addproductFeature="admin/products/AddproductFeature"
  productsChanged = new Subject<ProductModel[]>();

  constructor(private httpClient: HttpClient, private auService: AuthService) { }

  getAll() {


    const req = this.httpClient.get<ProductModel[]>( 'admin/products/', {
      observe: 'body',
      responseType: 'json',

    });

    return req;
  }

  getById(id: string) {


    const req = this.httpClient.get<any>( 'admin/products/' + id, {
      observe: 'body',
      responseType: 'json',

    });

    return req;
  }

  getAllEducationalSources() {


    const req = this.httpClient.get<any>( 'admin/educationalSources/getEducationalSources', {
      observe: 'body',
      responseType: 'json',

    });

    return req;
  }

  addProductIntoES(ProductId,esSourceId) {


    const req = this.httpClient.post<any>( 'admin/educationalSources/addProductIntoES/'+ProductId,{esSourceId}, {
      observe: 'body',
      responseType: 'json',

    });

    return req;
  }

  

  addProduct(product: ProductModel, file) {
    
    const body = new FormData();

    body.append('title', product.title);
    body.append('shortDesc', product.shortDesc);
    body.append('LongDesc', product.LongDesc);
    body.append('titleEnglish', product.titleEnglish);
    body.append('productKind',product.productKind);
    body.append('logo', file, file.name);
    body.append('like',product.like);
    body.append('bazdid',product.bazdid);
    body.append('price',product.price);
    body.append('discountPercent',product.discountPercent);
    body.append('productCode',product.productCode);
    body.append('productPoint',product.productPoint);
    

    body.append('priority',product.priority);
    body.append('exist',product.exist);
    body.append('sellCount',product.sellCount);

    const req = new HttpRequest('POST','admin/products/create', body,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  updateProduct(product: ProductModel, file, id: string) {

    const body = new FormData();
    let req;
    if (file) {
      body.append('title', product.title);
      body.append('shortDesc', product.shortDesc);
      body.append('LongDesc', product.LongDesc);
      body.append('logo', file, file.name);
      body.append('productKind',product.productKind);
      body.append('titleEnglish', product.titleEnglish);
      body.append('like',product.like);
      body.append('bazdid',product.bazdid);
      body.append('price',product.price);

      body.append('discountPercent',product.discountPercent);
      body.append('productCode',product.productCode);
      body.append('productPoint',product.productPoint);
      body.append('priority',product.priority);
      body.append('exist',product.exist);
      
      body.append('sellCount',product.sellCount);
      req = new HttpRequest('PATCH','admin/products/edit/' + id, body,
        {

          reportProgress: true
        });
    } else if (product.logo.length > 0) {
      product.logo = product.logo.slice(env.assestUrl.length, product.logo.length);
      // console.log(product.logo);

      req = new HttpRequest('PATCH','admin/products/edit/' + id, product,
        {

          reportProgress: true
        });
    }
    return this.httpClient.request(req);
  }

  AddproductFeature(prodId,body) {
    // debugger

    const req = new HttpRequest('POST','admin/products/AddproductFeature/'+prodId, body,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
    // return this.httpClient.post<ProductModel>(`${this.addproductFeature}/${prodId}`,body,{observe: 'body',responseType: 'json'});
  }
  
  deleteProduct(id: string) {
    const req = new HttpRequest('DELETE','admin/products/remove/' + id, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  deleteProductTechnologies(productId, techId) {
    const req = new HttpRequest('DELETE','admin/products/removeTechnologies/' + productId+'/'+ techId ,null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  deleteProduct_productKind(productId, kindId) {
    const req = new HttpRequest('DELETE','admin/products/removekind/' + productId+'/'+ kindId ,null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
  addProductTechnologies(productId, techId) {


    const req = new HttpRequest('POST','admin/products/addTechnologies/' + productId, { technologyId: techId },
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
  deleteProductBanners(bannerId) {
    const req = new HttpRequest('DELETE','admin/products/removeBanners/'  + bannerId ,null,
      {
        reportProgress: true
      });

    return this.httpClient.request(req);
  }
  AddRevision(bannerData,image,productId) {

    const body = new FormData();


    body.append('description', bannerData.description);
    body.append('mainTitle', bannerData.mainTitle);
    body.append('desc', bannerData.desc);
    body.append('title', bannerData.title);
    body.append('imageName', image.name);


    body.append('image', image, image.name);
    return this.httpClient.patch<any>('admin/products/addRevision/' + productId, body,{reportProgress: true});
   
  }
  
  DeleteRevissionDetail(revisionDetailId) {


    return this.httpClient.delete<any>('admin/products/DeleteRevissionDetail/' + revisionDetailId,{reportProgress: true});
   
  
  }

  UpdateRevision(revisionData,productId) {

    const body = new FormData();

    body.append('description', revisionData.description);
    body.append('mainTitle', revisionData.mainTitle);

    return this.httpClient.patch<any>('admin/products/UpdateRevision/' + productId,body,{reportProgress: true});
  
  }
  AddRevisionDetail(revisionData,productId,fileimage) {

    const body = new FormData();

    body.append('image', fileimage.name);
    
    body.append('imagez', fileimage, fileimage.name);
    body.append('title', revisionData.title);
    body.append('desc', revisionData.desc);

    return this.httpClient.patch<any>('admin/products/AddRevisionDetail/'+productId,body,{reportProgress: true});
   
  }
  addProductBanners(bannerData,file, icon,productId) {

    const body = new FormData();


    body.append('desc', bannerData.desc);
    body.append('title', bannerData.title);
    body.append('fileType', bannerData.fileType);
    body.append('file', file, file.name);
    body.append('icon', icon, icon.name);


    const req = new HttpRequest('POST','admin/products/addBanners/' + productId, body,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
  EditProductBanners(bannerData,file, icon,bannerId) {

    const body = new FormData();
    

    body.append('desc', bannerData.desc);
    body.append('title', bannerData.title);
    body.append('fileType', bannerData.fileType);
    body.append('file', file, file.name);
    body.append('icon', icon, icon.name);

    // debugger
    const req = new HttpRequest('PATCH','admin/products/editBanners/' + bannerId, body,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
  
  deleteProductAdvantages(productId, advantageId) {
    const req = new HttpRequest('DELETE','admin/products/removeAdvantages/'  + advantageId ,null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
  addProductAdvantages(advantage, productId,fileImage,fileIcon) {
    const body = new FormData();


    body.append('desc', advantage.desc);
    body.append('title', advantage.title);
    body.append('image', fileImage, fileImage.name);
    body.append('icon', fileIcon, fileIcon.name);

    const req = new HttpRequest('POST','admin/products/addAdvantages/' + productId, body,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  deleteProductFeatures(productId, FeatureId) {
    const req = new HttpRequest('DELETE','admin/products/DeleteProductFeature/'  + FeatureId ,null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  DeleteProductFeature(productId, FeatureId) {
    // debugger
    const req = new HttpRequest('DELETE','admin/products/DeleteProductFeature/'+ FeatureId+"/"+productId ,null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
  addProductFeatures(feature, productId,fileImage,fileIcon) {

    const body = new FormData();


    body.append('desc', feature.desc);
    body.append('title', feature.title);
    body.append('featureKind', feature.featureKind);
    body.append('image', fileImage, fileImage.name);
    body.append('icon', fileIcon, fileIcon.name);

    const req = new HttpRequest('POST','admin/products/addFeatures/' + productId, body,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
  deleteProductEducationalSources(productId, EducationalSourceId) {
    const req = new HttpRequest('DELETE','admin/educationalSources/removeEducationalSources/'  + EducationalSourceId ,null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
  addProductEducationalSources(feature,file,fileIcon) {

    const body = new FormData();


    body.append('desc', feature.desc);
    body.append('title', feature.title);
    body.append('fileType', feature.fileType);
    body.append('file', file, file.name);
    body.append('icon', fileIcon, fileIcon.name);
   


    const req = new HttpRequest('POST','admin/educationalSources/add' , body,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  EditProductEducationalSources(feature, productId,file,fileIcon) {

    const body = new FormData();


    body.append('desc', feature.desc);
    body.append('title', feature.title);
    body.append('fileType', feature.fileType);
    body.append('file', file, file.name);
    body.append('icon', fileIcon, fileIcon.name);
   


    const req = new HttpRequest('PATCH','admin/educationalSources/edit/' + productId, body,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  removeFromProducts(productId,esId) {


   


    const req = new HttpRequest('DELETE','admin/educationalSources/removeFromProducts/' + productId, {esId},
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
  
}


