import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { RoleModel } from 'src/app/shared/models/role.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-role-edit',
  templateUrl: './user-role-edit.component.html',
  styleUrls: ['./user-role-edit.component.css']
})
export class UserRoleEditComponent implements OnInit {

  kinds: RoleModel[];
  roleId: string;
  userId; string;
  roleUserForm: FormGroup;

  constructor(private rlService: RoleService, private route: ActivatedRoute, private router: Router, private usService: UserService) { }

  ngOnInit() {
    this.initForm();
    this.rlService.getAll().subscribe((roles) => {
      this.kinds = roles;
    });
    this.route.params.subscribe((params: Params) => {
      this.userId = params.id;
    });
  }

  onSubmit() {

    this.usService.addRole(this.userId, this.roleUserForm.get('kind').value)
      .subscribe(
        (result) => {
          const user = result['body'];
          if (user) {


            this.usService.userChange.next(user['result']);
          }}           ,
        (error) => console.log(error));

  }
  private initForm() {

    this.roleUserForm = new FormGroup({
      kind: new FormControl('', Validators.required)
    });
  }


}
