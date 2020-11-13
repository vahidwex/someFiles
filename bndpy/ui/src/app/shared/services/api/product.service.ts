import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  GetallApi="products"
  getProductByEnName="getProductByEnName"
  increaseView="increaseView"
  increaseLike="increaseLike"
  productsOfBasket="productsOfBasket"
  findByStore="findByStore"
  getproductbyPKid="getproductbyPKid"
  getproductbyPKName="getproductbyPKName"
  addComment="addComment"
  constructor(
    private http:HttpClient
  ) { }

  header= new HttpHeaders({

  });
  
 
  public GetAll(sortBy="",limit=9,skip=0): Observable<any> {
    
    if(sortBy==""){
      return this.http.get<any>(`${this.GetallApi}?limit=${limit}&skip=${skip}`,{headers:this.header})
    }else{
      return this.http.get<any>(`${this.GetallApi}${sortBy}&limit=${limit}&skip=${skip}`,{headers:this.header})
    }
  }

  public IncreaseView(id){
    return this.http.get<any>(`${this.increaseView}/${id}`,{headers:this.header})
  }
  public IncreaseLike(id){
    return this.http.get<any>(`${this.increaseLike}/${id}`,{headers:this.header})
  }

  public GetProductByEnName(EnName): Observable<any> {
    
    return this.http.get<any>(`${this.getProductByEnName}/${EnName}`,{headers:this.header})
  }
  public FindByStore(PDK_ID){
    return this.http.get<any>(`${this.findByStore}/${PDK_ID}`,{headers:this.header})
  }
  public GetProductsByIds(ids): Observable<any> {
    
    return this.http.post<any>(`${this.productsOfBasket}`,ids,{headers:this.header})
  }
  public GetproductbyPKid(id): Observable<any> {
    
    return this.http.get<any>(`${this.getproductbyPKid}/${id}`,{headers:this.header})
  }
  public AddComment(prodId,body,token): Observable<any> {
    
    return this.http.post<any>(`${this.addComment}/${prodId}/${token}`,body,{headers:this.header})
  }

  
  
}
