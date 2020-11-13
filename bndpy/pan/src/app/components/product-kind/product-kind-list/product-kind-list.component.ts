import { Component, OnInit, Injectable } from '@angular/core';
import { TechnologyKindModel } from 'src/app/shared/models/technology-kind.model';
import { ProductKindModel } from 'src/app/shared/models/product-kind.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnologyKindService } from 'src/app/services/technology-kind.service';
import { ProductKindService } from 'src/app/services/product-kind.service';
@Component({
  selector: 'app-product-kind-list',
  templateUrl: './product-kind-list.component.html',
  styleUrls: ['./product-kind-list.component.css']
})
export class ProductKindListComponent implements OnInit {

  technologyKinds: ProductKindModel[];

  constructor(private route: ActivatedRoute, private router: Router, private bnService: ProductKindService) { }

  ngOnInit() {
    this.getProductKinds();
  }

  addNew(){
    this.router.navigate([  'new'], { relativeTo: this.route })
  }

  onEdit(id) {
    this.router.navigate([ id], { relativeTo: this.route })
  }

  onDelete(id) {
    this.bnService.deleteproductKind(id).subscribe((response)=>{ this.getProductKinds()
    });
  }

  getProductKinds(){
    this.bnService.getAll().subscribe( (result: ProductKindModel[]) => {
      this.technologyKinds = result ;

    })
  }


}
