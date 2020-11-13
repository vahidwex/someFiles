import { Component, OnInit } from '@angular/core';
import { RoleModel } from 'src/app/shared/models/role.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {



  roles: RoleModel[];

  constructor(private route: ActivatedRoute, private router: Router, private bnService: RoleService) { }

  ngOnInit() {
    this.getRoles();
  }

  addNew(){
    this.router.navigate([  'new'], { relativeTo: this.route })
  }

  onEdit(id) {
    this.router.navigate([ id, 'edit'], { relativeTo: this.route })
  }

  onDelete(id) {
    this.bnService.deleteRole(id).subscribe((response)=>{ this.getRoles()
    });
  }

  onAccessShow(id){

      this.router.navigate([id,'accesses'], { relativeTo: this.route });


  }
  getRoles(){
    this.bnService.getAll().subscribe( (result: RoleModel[]) => {
      console.log(result)
      this.roles = result ;

    })
  }


}
