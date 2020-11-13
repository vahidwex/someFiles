import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsKindService } from 'src/app/services/productDetailsKind.service';
import { ProductDetailsKindModel } from 'src/app/shared/models/productDetailsKind.modelt';

@Component({
  selector: 'app-product-details-kind-list',
  templateUrl: './product-details-kind-list.component.html',
  styleUrls: ['./product-details-kind-list.component.css']
})
export class ProductDetailsKindListComponent implements OnInit {

  ProductDetailsKinds: ProductDetailsKindModel[];
  
  constructor(private route: ActivatedRoute, private router: Router, private PDKservice: ProductDetailsKindService) { }

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
    this.PDKservice.GetAll().subscribe( (result: ProductDetailsKindModel[]) => {
      this.ProductDetailsKinds = result ;

      // this.PDKservice.userChange.next(this.users.find(obj => obj._id === this.id));
    })
  }

}
