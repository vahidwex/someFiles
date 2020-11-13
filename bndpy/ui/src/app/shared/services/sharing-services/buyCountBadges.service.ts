import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieUtilitieService } from '../utilities/cockie.service';


@Injectable({
  providedIn: 'root'
})
export class BuyCountBadgesService {
  selectedProductsArray:any[]=[];
  selectedProductsOBJ
  count=0;

  private countSource = new BehaviorSubject(0);
  currentCount = this.countSource.asObservable();

  

  constructor(private cookieService:CookieUtilitieService) { 
    
  }
  calculateCount(){
    this.selectedProductsOBJ=this.cookieService.formToObject();
    this.selectedProductsArray=[]
    if(this.selectedProductsOBJ.selectedProducts){
    this.selectedProductsArray=JSON.parse(this.selectedProductsOBJ.selectedProducts);
      for (let i = 0; i < this.selectedProductsArray.length; i++) {
        const element = this.selectedProductsArray[i];
        this.count+=element.count;
        
      }
      
    this.countSource.next(this.count)
    this.count=0;
    }
  }
}
