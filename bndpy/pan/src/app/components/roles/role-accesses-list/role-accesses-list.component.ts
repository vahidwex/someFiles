import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { RoleAccessModel } from 'src/app/shared/models/role-access.model';
import { env } from 'src/app/shared/env-consts';
import { RoleModel } from 'src/app/shared/models/role.model';

@Component({
  selector: 'app-role-accesses-list',
  templateUrl: './role-accesses-list.component.html',
  styleUrls: ['./role-accesses-list.component.css']
})
export class RoleAccessesListComponent implements OnInit {

  roleAccesses: RoleAccessModel[];
  accesses;

  constructor(private route: ActivatedRoute, private router: Router, private rlService: RoleService) { }

  ngOnInit() {
    this.accesses = env.accessList;

    this.route.params.subscribe((param: Params) => {
      this.rlService.getById(param.id).subscribe((result: RoleModel) => {
        this.roleAccesses = result[0].accesses;
      });
    });
  }


  onModifyAccess(id, status) {

    console.log('status', status);
    this.rlService.modifyAccess(id, status).subscribe((result) => console.log('Done'), (err) => console.log(err));

  }

  onNavigate(){
    this.router.navigate(['../../'],{relativeTo: this.route})
  }

}
