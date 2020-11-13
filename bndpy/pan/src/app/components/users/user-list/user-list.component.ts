import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserModel[];
  id;
  constructor(private route: ActivatedRoute, private router: Router, private usService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  addNew(){
    this.router.navigate([  'new'], { relativeTo: this.route })
  }

  onRoles(id) {
    this.getUsers();
    this.id =id;
    this.router.navigate([  id, 'roles'], { relativeTo: this.route })
  }

  onEdit(id) {
    this.router.navigate([ id, 'edit'], { relativeTo: this.route })
  }

  onChangePass(id){
    this.usService.changePass(id,'1234567').subscribe((user)=>{
      console.log(user);

    });
  }
  private getUsers(){
    this.usService.getAll().subscribe( (result: UserModel[]) => {
      this.users = result ;

      this.usService.userChange.next(this.users.find(obj => obj._id === this.id));
    })
  }
}
