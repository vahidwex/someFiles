import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product-educational-source',
  templateUrl: './product-educational-source.component.html',
  styleUrls: ['./product-educational-source.component.css']
})
export class ProductEducationalSourceComponent implements OnInit {

  productTechnologyForm: FormGroup;
  kinds: [];
  productESes: any[]=[];
  productId: string;
  constructor(
              private prService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.prService.getAllEducationalSources().subscribe((techs) => {

      console.log(techs)
      this.kinds = techs;
    });
    this.route.params.subscribe((params: Params) => {
      this.productId = params.id;
      this.prService.getById(params.id).subscribe((product) => {



        this.productESes = product[0].technologies;
        this.getAllbyProdId();
      });
    });

  }

  removeProducts(techId) {


    this.prService.removeFromProducts(this.productId, techId._id).subscribe((result) => {
      console.log(result)
      this.getAllbyProdId();
    });

  }
  onNavigate() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {
    const techId = this.productTechnologyForm.get('kind').value;
    console.log("this.productId: "+this.productId +"educationalSource :"+techId)
    this.prService.addProductIntoES(this.productId, techId).subscribe((result) => {
      this.getAllbyProdId();

      this.productTechnologyForm.reset();
    });

  }
  private initForm() {

    this.productTechnologyForm = new FormGroup({
      kind: new FormControl('', Validators.required)
    });
  }
    
  getAllbyProdId(){
    this.prService.getById(this.productId).subscribe(res=>{
      console.log(res)
      this.productESes=res;
    })
  }
}
