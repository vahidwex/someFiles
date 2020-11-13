import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../../../shared/services/api/product.service';
import { ENV } from '../../../shared/values/env';
import { TitleUtilityService } from '../../../shared/services/utilities/title.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.scss']
})
export class ProductIndexComponent implements OnInit {
  
  env=ENV
  sortBy=""
  constructor(
    private TitleUtilityService:TitleUtilityService,
    private route:ActivatedRoute,
    private ProductService:ProductService

  ) { }
  items:any[]=[];
  itemsSearch:any[]=[];
  LoadLocation:number=0;
  LoadingFlag=false;
  searchValue='';
  skip=0;
  limit=8
  search() {

        if (this.searchValue != '') {
          this.items = this.itemsSearch.filter(search => {
            
            return search.title.toLowerCase().match(this.searchValue.toLowerCase());
          })
          
        }else{
          this.getAll();
          this.skip=0;
        }

    }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      params.id?
        this.findByPKID(params.id):
          this.getAll();

    })
    this.TitleUtilityService.add("محصولات")
    
    
  }
  @HostListener("window:scroll", []) onWindowScroll() {
    let element= document.getElementById('Location')
    this.LoadLocation=element.offsetTop-60;

    if(this.LoadLocation<window.pageYOffset){

      
        if(this.LoadingFlag==false){
          this.LoadingFlag=true;

          this.skip+=1;


          this.ProductService.GetAll(this.sortBy,this.limit,this.skip*this.limit).subscribe(res=>{
            res.forEach(element => {
              
              this.items.push(element);
            });
            
          })
          
          console.log('fireLoading')
        }else{
          setTimeout(() => {
           this.LoadingFlag=false;
            
          }, 1000);
        }
      


      
      
    }
    
    
  }
  
  onScroll(event){
    console.log(event)
  }
  onChange(val){
    this.sortBy=val;
    this.getAll();
  }
  getAll(){
    this.ProductService.GetAll(this.sortBy,this.limit,this.skip).subscribe(res=>{
      console.log("in getall")
      this.items=res;
      this.itemsSearch=res;
    })
  }
  findByPKID(id){
    this.ProductService.GetproductbyPKid(id).subscribe(res=>{console.log("in getby")
      this.items=res;
      this.itemsSearch=res;
    })
  }
}
