import { Component, OnInit, PLATFORM_ID, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../../shared/services/api/product.service';
import { CapabilityService } from '../../../shared/services/api/capability.service';
// import { SolutionService } from '../../../shared/services/api/solution.service';
import { EducationalSourcesService } from '../../../shared/services/api/educational-sources.service';

import { ActivatedRoute, Router } from '@angular/router';
import { TitleUtilityService } from '../../../shared/services/utilities/title.service';
import { ThemePalette } from '@angular/material/core';
import { isPlatformBrowser } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ENV } from '../../../shared/values/env';
import { CookieUtilitieService } from '../../../shared/services/utilities/cockie.service';
import { BuyCountBadgesService } from 'src/app/shared/services/sharing-services/buyCountBadges.service';
import { UserService } from 'src/app/shared/services/api/login.service';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  likedThis=false;
  loggedUser=false;
  
  commentForm:FormGroup;


  buyedCount:number=0;
  env=ENV
  encapsulation: ViewEncapsulation.None
  product:any="";
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ProductService:ProductService,
    private CapabilityService:CapabilityService,
    private route:ActivatedRoute,
    private EducationalSourcesService:EducationalSourcesService,
    private TitleUtilityService:TitleUtilityService,
    private cookieService:CookieUtilitieService,
    private badgesService:BuyCountBadgesService,
    private router:Router,
    private UserService:UserService
    

  ) { }
    revision:any='';
    kinds:any[]=[]
    advantages:any[]=[]
    banners:any[]=[]
    features:any[]=[]
    technologies:any[]=[]
    capabilities:any[]=[];
    comments:any[]=[];
    products:any[];
    educationalSources:any[];
    
  customOptions: any = {
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    margin:30,
    
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  count:number=0;
  selectedProductsArray:any[]=[];
  selectedProductsOBJ

  tabIndex=0;
  SelectedImg=""
  backgroundColor: ThemePalette='primary'
  ngOnInit() {
    this.route.params.subscribe(({name})=>{
      this.TitleUtilityService.add("محصولات -"+ name)
      this.TitleUtilityService.add(name)
      this.badgesService.calculateCount();
      this.ProductService.GetProductByEnName(name).subscribe(res=>{

        console.log(res)
        
        this.product=res;
        this.authCheck();
        this.likedCheck();

        this.selectedProductsOBJ=this.cookieService.formToObject();
        
        this.selectedProductsArray=[]
        if(this.selectedProductsOBJ.selectedProducts){
            this.selectedProductsArray=JSON.parse(this.selectedProductsOBJ.selectedProducts);
        }
        
        this.kinds=this.product.productKind;
        this.SelectedImg=this.product.logo;
        this.banners=this.product.banners;
        this.banners.push({
          image:this.product.logo,
          title:this.product.title,
          fileType:1
        });
        this.advantages=this.product.advantages;
        this.features=this.product.features;
        this.revision=this.product.revision
        this.technologies=this.product.technologies;
        this.comments=this.product.comments;
        this.ProductService.IncreaseView(this.product._id).subscribe(res=>{
          // console.log(res)
        })
        this.EducationalSourcesService.GetEsByProductId(this.product._id).subscribe(Esres=>{
          
          this.educationalSources=Esres;
        })
        this.calculateCount(this.product._id)

      })
    })
    this.CapabilityService.GetAll().subscribe(res=>{
      this.capabilities=res;
    })
    this.ProductService.GetAll().subscribe(res=>{
      this.products=res;
    })

    this.initRegister();
  }
  authCheck(){
    
    if(localStorage.getItem('UiUser')){
      // this.loggedSuccessfuly();
      this.UserService.CheckByToken(localStorage.getItem('UiUser')).subscribe(res=>{
        // console.log(res)
        if(res.success==true){
          this.loggedUser=true;
          
        }else{
          this.loggedUser=false;
          this.likedThis=false;
          return
        }
        
      })

    }else{
      return
    }
  }
  plusBasket(id){
    if(!this.product.exist){
      return
    }
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
    this.calculateCount(this.product._id)
    this.badgesService.calculateCount();
  }
  minuseBasket(id){
    if(!this.product.exist){
      return
    }
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

      
    }else{
      this.removeFromBasket(id);
    }
    this.calculateCount(this.product._id)
    this.badgesService.calculateCount();
  }
  like(){
    if(this.loggedUser ){
      if(!this.likedThis==true){
        this.UserService.InsertLike(this.product._id,localStorage.getItem("UiUser")).subscribe(res=>{
          this.likedThis=true;
        })
      }else{
        return;
      }

    }else{
      alert("لطفا وارد حساب کاربری خود شوید")
    }
  }
  likedCheck(){
    this.UserService.LikedCheck(this.product._id,localStorage.getItem("UiUser")).subscribe(res=>{
      if(res.success==false){
        this.likedThis=false;
      }else{
        this.likedThis=true;
        
      }
      
    })
  }
  routeToDonwloadFile(file){
    window.location.href=this.env.port+'/images/'+file
    
    
  }
  removeFromBasket(id){
    this.selectedProductsArray = this.selectedProductsArray.filter(( obj )=> {
      return obj._id !== id;
    });
    document.cookie="selectedProducts="+JSON.stringify(this.selectedProductsArray);
    this.calculateCount(this.product._id)
    this.badgesService.calculateCount();
  }
  addToBasket(id){

    if(this.selectedProductsArray.filter(e => e._id === id).length > 0){

      let found= this.selectedProductsArray.filter(e => e.id === id)
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
    this.calculateCount(this.product._id)
    this.badgesService.calculateCount();
  }

  checkCookie(id){
    if(!this.product.exist){
      return
    }
    this.selectedProductsOBJ=this.cookieService.formToObject();
    
    if(this.selectedProductsArray.filter(e => e._id === id).length > 0){
      
      return true
    }else{
      return false;
    }
  }

  changeBanner(banner){
    this.SelectedImg=banner;
    document.getElementById('selectedImage').classList.add('fadeIn')
    if(isPlatformBrowser(this.platformId)) {

        setTimeout(() => {
          document.getElementById('selectedImage').classList.remove('fadeIn');
        }, 500);
      }

  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.tabIndex= tabChangeEvent.index;
  }

  calculateCount(id){
    if(!!this.selectedProductsArray.filter(e => e._id === id).length){
      this.count=this.selectedProductsArray.filter(e => e._id === id)[0].count;
    }else{
      this.count=0;
    }
    this.checkCookie(id)
    // console.log(this.selectedProductsArray)
  }
  initRegister(){
    this.commentForm= new FormGroup({
      'title':new FormControl(''),
      'desc':new FormControl('')
    })

  }

  addComment(){
    this.ProductService.AddComment(this.product._id,this.commentForm.value,localStorage.getItem('UiUser')).subscribe(res=>{
      this.comments=res.product.comments;
    })
  }
}
