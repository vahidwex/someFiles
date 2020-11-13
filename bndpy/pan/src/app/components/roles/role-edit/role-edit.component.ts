import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Params, ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { env } from 'src/app/shared/env-consts';


@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
  role = { title: '', logo: '' , tags: '' };

  roleForm: FormGroup;
  editMode = false;
  logoPath;
  imgURL: any;
  message;
  id: string;
  private file;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private rlService: RoleService) { }

  ngOnInit() {

    this.id = this.route.snapshot.params.id;
    this.initForm();


    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
          this.editMode = params.id != null;
          this.setData();
        }
      );

  }



  onBack(){
    if(this.editMode){
      this.router.navigate(['../../'], { relativeTo: this.route });
    }else{
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {
    if (this.editMode) {
      console.log(this.roleForm)
      this.rlService.updateRole(this.roleForm.value , this.id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {
      this.rlService.addRole(this.roleForm.value )
        .subscribe(
          (result) => this.onCancel(),
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.roleForm.setValue({ title: '' });

  }

  setData() {

    if (this.editMode) {
      this.rlService.getById(this.id).subscribe((role) => {

        console.log('role of get: ', role);
        this.role = role[0];


        this.roleForm.setValue({
          title: this.role.title,

        })
      })
    }



  }

  private initForm() {

    this.roleForm = new FormGroup({
      title: new FormControl('', Validators.required),

    });
  }

}
