import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/services/stores.service';
import { StoresModel } from 'src/app/shared/models/stores.model';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})
export class StoresListComponent implements OnInit {

  stores: StoresModel[];
  
  constructor(private route: ActivatedRoute, private router: Router, private stService: StoresService) { }

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
    this.stService.Remove(id).subscribe(res=>{
      this.GetPDKs();
    })
  }
  onDetail(id){
    this.router.navigate([ id], { relativeTo: this.route })
  }
  private GetPDKs(){
    this.stService.GetAll().subscribe( (result: StoresModel[]) => {
      this.stores = result ;

      // this.PDKservice.userChange.next(this.users.find(obj => obj._id === this.id));
    })
  }

}
