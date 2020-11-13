import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: ProductModel[];

  constructor(private route: ActivatedRoute, private router: Router, private prService: ProductService ) { }

  ngOnInit() {

    this.getProducts();
  }

  addNew(){
    this.router.navigate([  'new'], { relativeTo: this.route })
  }

  onEdit(id) {
    this.router.navigate([ id, 'edit'], { relativeTo: this.route })
  }

  onDelete(id) {
    this.prService.deleteProduct(id).subscribe((response)=>{ this.getProducts()
    });
  }
  onDetail(id){
    this.router.navigate([ id], { relativeTo: this.route })
  }
  getProducts(){
    this.prService.getAll().subscribe( (result: ProductModel[]) => {
      this.products = result ;

    })
  }
}
