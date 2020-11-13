import { Component, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/shared/models/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: CustomerModel[];

  constructor(private route: ActivatedRoute, private router: Router, private cuSerivce: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  addNew(){
    this.router.navigate([  'new'], { relativeTo: this.route })
  }

  onEdit(id) {
    this.router.navigate([ id, 'edit'], { relativeTo: this.route })
  }

  onDelete(id) {
    this.cuSerivce.deleteCustomer(id).subscribe((response)=>{ this.getCustomers()
    });
  }

  getCustomers(){
    this.cuSerivce.getAll().subscribe( (result: CustomerModel[]) => {
      this.customers = result ;

    })
  }

  onAddProducts(id){
    this.router.navigate([id,'products'],{relativeTo: this.route})
  }
}
