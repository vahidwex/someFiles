import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { TechnologyModel } from 'src/app/shared/models/technology.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { TechnologyService } from 'src/app/services/technology.service';

@Component({
  selector: 'app-product-technology',
  templateUrl: './product-technology.component.html',
  styleUrls: ['./product-technology.component.css']
})
export class ProductTechnologyComponent implements OnInit {

  productTechnologyForm: FormGroup;
  kinds: TechnologyModel[];
  productTechnologies: string[];
  productId: string;
  constructor(private teService: TechnologyService,
              private prService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.teService.getAll().subscribe((techs) => {
      this.kinds = techs;
    });
    this.route.params.subscribe((params: Params) => {
      this.productId = params.id;
      this.prService.getById(params.id).subscribe((product) => {



        this.productTechnologies = product[0].technologies;

      });
    });

  }

  removeProducts(techId) {


    this.prService.deleteProductTechnologies(this.productId, techId).subscribe((result) => {
      const product = result['body'];


      if (product) {
        this.productTechnologies = product['product'].technologies;
      }
    });

  }
  onNavigate() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {
    const techId = this.productTechnologyForm.get('kind').value;

    this.prService.addProductTechnologies(this.productId, techId).subscribe((result) => {
      const product = result['body'];


      if (product) {
        this.productTechnologies = product['product'].technologies;
      }
      this.productTechnologyForm.reset();
    });

  }
  private initForm() {

    this.productTechnologyForm = new FormGroup({
      kind: new FormControl('', Validators.required)
    });
  }

}
