import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product.model';
import { SolutionService } from 'src/app/services/solution.service';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SolutionModel } from 'src/app/shared/models/solution.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-solution-product-list',
  templateUrl: './solution-product-list.component.html',
  styleUrls: ['./solution-product-list.component.css']
})
export class SolutionProductListComponent implements OnInit {
  solutionProductForm: FormGroup;
  kinds: ProductModel[];
  solutionProducts: string[];
  solutionId: string;
  constructor(private slService: SolutionService,
              private prService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.prService.getAll().subscribe((roles) => {
      this.kinds = roles;
    });
    this.route.params.subscribe((params: Params) => {
      this.solutionId = params.id;
      this.slService.getById(params.id).subscribe((solution) => {


        this.solutionProducts = solution[0].products;

      });
    });

  }

  removeProducts(productId) {


    this.slService.deleteSolutionProducts(this.solutionId, productId).subscribe((result) => {
      const solution = result['body'];


      if (solution) {
        this.solutionProducts = solution['result'].products;
      }
    });

  }
  onNavigate() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
  onSubmit() {
    const productId = this.solutionProductForm.get('kind').value;

    this.slService.addSolutionProducts(this.solutionId, productId).subscribe((result) => {
      const solution = result['body'];


      if (solution) {



          this.solutionProducts = solution['result'].products;
        }

    });

  }
  private initForm() {

    this.solutionProductForm = new FormGroup({
      kind: new FormControl('', Validators.required)
    });
  }
}
