import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/api/product.service';
import { CookieUtilitieService } from 'src/app/shared/services/utilities/cockie.service';
import { ENV } from 'src/app/shared/values/env';
import { TitleUtilityService } from 'src/app/shared/services/utilities/title.service';
import { Router } from '@angular/router';
import { ClientService } from '../../../shared/services/api/client.service';
import { BuyCountBadgesService } from 'src/app/shared/services/sharing-services/buyCountBadges.service';


@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss']
})
export class BasketPageComponent implements OnInit {
  products
  env=ENV
  discount=""
  constructor(
    private productService:ProductService,
    private cookieService:CookieUtilitieService,
    private TitleUtilityService:TitleUtilityService,
    private router:Router,
    private ClientService:ClientService,
    private badgesService:BuyCountBadgesService
  ) { }
  
  selectedProductsArray:any[]=[];
  selectedProductsOBJ
  
  ngOnInit(): void {
    this.TitleUtilityService.add("سبد خرید")
    this.getBasketIds();
    this.badgesService.calculateCount();
    
  }
  getBasketIds(){
    this.selectedProductsOBJ=this.cookieService.formToObject();
    this.selectedProductsArray=[]
    if(this.selectedProductsOBJ.selectedProducts){
      this.selectedProductsArray=JSON.parse(this.selectedProductsOBJ.selectedProducts);
      this.Getall()
    }
    // console.log(this.selectedProductsArray)
  }
  Getall(){
    this.productService.GetProductsByIds(this.selectedProductsArray).subscribe(res=>{
      console.log(res)
      this.products=res.product;
      this.updateCountToObject()
    })
  }
  next(){

    document.cookie="discount="+this.discount;

    if(!localStorage.getItem("userToken")){
      this.router.navigate(['personalData'])
    }else{
      this.ClientService.CheckToken(localStorage.getItem("userToken")).subscribe(res=>{
        if(res && res==true){
          this.router.navigate(['factor','preview'])
        }else{
          this.router.navigate(['personalData'])
        }
      })
    }

  }
  plusBasket(id){

    if(this.selectedProductsArray.filter(e => e._id === id).length > 0){

      let found= this.selectedProductsArray.filter(e => e._id === id)
      found.map(x=>x.count++)

      this.selectedProductsArray = this.selectedProductsArray.filter(( obj )=> {
        return obj._id !== id;
      });

      found.forEach(element => {
        
        this.selectedProductsArray.push(element);
      });

      document.cookie="selectedProducts="+JSON.stringify(this.selectedProductsArray);

      
    }else{
      this.addToBasket(id);
    }
    this.updateCountToObject();
    this.badgesService.calculateCount();

  }
  like(){

  }
  minuseBasket(id){

    if( this.selectedProductsArray.filter(e => e._id === id).length > 0 &&
        this.selectedProductsArray.filter(e => e._id === id)[0].count>1
    ){

      let found= this.selectedProductsArray.filter(e => e._id === id)
      found.map(x=>x.count--)

      this.selectedProductsArray = this.selectedProductsArray.filter(( obj )=> {
        return obj._id !== id;
      });

      found.forEach(element => {
        
        this.selectedProductsArray.push(element);
      });

      document.cookie="selectedProducts="+JSON.stringify(this.selectedProductsArray);
      this.updateCountToObject();

      
    }else{

      this.removeFromBasket(id);

      this.products.forEach((element,i) => {
        if(element._id==id){
          this.products[i].count=0
        }
      });
    }
  this.badgesService.calculateCount();
    

  }
  removeFromBasket(id){
    this.selectedProductsArray = this.selectedProductsArray.filter(( obj )=> {
      return obj._id !== id;
    });
    document.cookie="selectedProducts="+JSON.stringify(this.selectedProductsArray);
    // this.updateCountToObject();
    this.badgesService.calculateCount();

  }
  addToBasket(id){

    if(this.selectedProductsArray.filter(e => e._id === id).length > 0){

      let found= this.selectedProductsArray.filter(e => e._id === id)
      found.map(x=>x.count++)

      this.selectedProductsArray = this.selectedProductsArray.filter(( obj )=> {
        return obj._id !== id;
      });

      found.forEach(element => {
        
        this.selectedProductsArray.push(element);
      });

      document.cookie="selectedProducts="+JSON.stringify(this.selectedProductsArray);

      
    }else{
        this.selectedProductsArray.push({_id:id ,count:1})
        document.cookie="selectedProducts="+JSON.stringify(this.selectedProductsArray);
    }
    
    this.updateCountToObject();
    this.badgesService.calculateCount();

  }
  

  updateCountToObject(){
    
    for (let i = 0; i < this.selectedProductsArray.length; i++) {

      const productElement = this.selectedProductsArray[i];
      
      for (let j = 0; j < this.products.length ; j++) {

        const productsElement = this.products [j];
        
        if( productsElement._id == productElement._id ){
          
          let count=this.selectedProductsArray [j].count

          this.products[i] = { ...this.products[i] , count}
        }
        
      }

    }
    
  }

}
