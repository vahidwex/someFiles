import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/services/api/client.service';
import { TitleUtilityService } from 'src/app/shared/services/utilities/title.service';
import { CookieUtilitieService } from 'src/app/shared/services/utilities/cockie.service';
import { ProductService } from 'src/app/shared/services/api/product.service';
import { OrderService } from '../../../shared/services/api/order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-preview-factor',
  templateUrl: './preview-factor.component.html',
  styleUrls: ['./preview-factor.component.scss']
})
export class PreviewFactorComponent implements OnInit {
  constructor(
    private ClientService:ClientService,
    private TitleUtilityService:TitleUtilityService,
    private productService:ProductService,
    private cookieService:CookieUtilitieService,
    private orderService:OrderService,
    private router:Router
  ) { }
    selectedProductsArray:any[]=[];
    selectedProductsOBJ
    products:any[]=[]
    person:any=""
    discountCode:string;
    totalPrice=""
    totalPriceUpdated=""
    currentOrder;
  ngOnInit(): void {

    this.TitleUtilityService.add("سبد خرید")
    this.getBasketIds();
    this.ClientService.GetByToken(localStorage.getItem("userToken")).subscribe(res=>{
      // console.log(res)
      this.person=res.result;

      this.orderService.CerateOrder(this.selectedProductsArray,this.person._id,this.discountCode).subscribe(res=>{
        // console.log(res)
        this.currentOrder=res;
        this.totalPrice=res.totalPrice;
      })
    })

  }

  transfetCalcPrice(event){
    console.log(event)
    this.totalPriceUpdated=event.generationProperties.fixedPrice;
  }

  
  
  getBasketIds(){
    this.selectedProductsOBJ=this.cookieService.formToObject();
    this.selectedProductsArray=[]
    if(this.selectedProductsOBJ.discount){
      this.discountCode=this.selectedProductsOBJ.discount
    }
    if(this.selectedProductsOBJ.selectedProducts){
      this.selectedProductsArray=JSON.parse(this.selectedProductsOBJ.selectedProducts);

      this.Getall()
    }
    
  }
  Getall(){
    this.productService.GetProductsByIds(this.selectedProductsArray).subscribe(res=>{
      // console.log(res)
      this.products=res.product;
      this.updateCountToObject()
    })
  }
  personalBack(){
    this.router.navigate(["personalData"])
  }
  basketBack(){
    this.router.navigate(["basket"])
  }
  updateCountToObject(){
    
    for (let i = 0; i < this.selectedProductsArray.length; i++) {

      const productElement = this.selectedProductsArray[i];
      
      for (let j = 0; j < this.products.length ; j++) {

        const productsElement = this.products [j];
        
        if( productsElement._id == productElement.id ){
          
          let count=this.selectedProductsArray [j].count

          this.products[i] = { ...this.products[i] , count}
        }
        
      }

    }
    
  }

  init(){
    this.ngOnInit();
  }

}
