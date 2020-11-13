import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { env } from 'src/app/shared/env-consts';



@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user = { fullName: '', avatar: '', pass: '', email: '' };

  userForm: FormGroup;
  editMode = false;
  avatarPath;
  imgURL: any;
  message;
  id: string;
  private file;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private bnService: UserService) { }

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

  onUpload(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only avatars are supported.';
      return;
    }

    let reader = new FileReader();
    this.avatarPath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.file = files[0];

    this.userForm.patchValue({avatar : this.file.name})


    this.user.avatar = '';

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
      console.log(this.userForm)
      this.bnService.updateUser(this.userForm.value, this.file, this.id)
        .subscribe(
          (result) => this.onBack(),
          (error) => console.log(error)
        );
    } else {
      this.bnService.addUser(this.userForm.value, this.file)
        .subscribe(
          (result) => this.onCancel(),
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.userForm.setValue({ fullName: '', avatar: '', pass: '', email: '' });
    this.user.avatar = '';
  }

  setData() {

    if (this.editMode) {
      this.bnService.getById(this.id).subscribe((user) => {

        console.log('user of get: ', user);
        this.user = user[0];
        this.user.avatar = env.assestUrl + this.user.avatar;
        this.userForm.setValue({
          fullName: this.user.fullName,
          email: this.user.email,
          avatar: this.user.avatar,
          pass: '123456'
        })
      })
    }



  }

  private initForm() {

    this.userForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      avatar: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }


}
