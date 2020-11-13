import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/shared/models/user.model';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { RoleModel } from 'src/app/shared/models/role.model';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.css']
})
export class UserRoleListComponent implements OnInit {
  kinds: RoleModel[];
  userRoles: string[];
  userId: string;
  constructor(private usService: UserService, private rlService: RoleService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.rlService.getAll().subscribe((roles) => {
      this.kinds = roles;
    });

    this.usService.userChange.subscribe((user: UserModel) => {
      if (user) {
        this.userRoles = user.roles;
        this.userId = user._id;
      }
    });
  }

  removeRole(roleId) {


    this.usService.deleteUserRole(this.userId, roleId).subscribe((result) => {
      const user = result['body'];
      if (user) {
        this.usService.userChange.next(user['result']);
      }
    })

  }
  onNavigate(){
    this.router.navigate(['../../'],{relativeTo : this.route});
  }

}
