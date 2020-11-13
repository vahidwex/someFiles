import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsService } from 'src/app/services/productDetails.service';
import { ProductDetailsKindService } from 'src/app/services/productDetailsKind.service';
import { ProductDetailsModel } from 'src/app/shared/models/productDetails.model';

@Component({
  selector: 'app-product-details-list',
  templateUrl: './product-details-list.component.html',
  styleUrls: ['./product-details-list.component.css']
})
export class ProductDetailsListComponent implements OnInit {

  ProductDetails: ProductDetailsModel[];
  
  constructor(private route: ActivatedRoute, private router: Router, private PDKservice: ProductDetailsService) { }

  ngOnInit() {
    this.GetPDKs();
  }

  addNew(){
    this.router.navigate([  'new'], { relativeTo: this.route })
  }

 

  onEdit(id) {
    this.router.navigate([ id, 'edit'], { relativeTo: this.route })
  }

  removeProductDetails(id){
    this.PDKservice.Remove(id).subscribe(res=>{
      this.GetPDKs();
    })
  }
  private GetPDKs(){
    this.PDKservice.GetAll().subscribe( (result: ProductDetailsModel[]) => {
      this.ProductDetails = result ;

      // this.PDKservice.userChange.next(this.users.find(obj => obj._id === this.id));
    })
  }

}
