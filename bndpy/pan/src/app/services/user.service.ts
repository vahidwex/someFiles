import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { UserModel } from 'src/app/shared/models/user.model';
import { env } from 'src/app/shared/env-consts';
import { AuthService } from './auth.service';


@Injectable()
export class UserService {


  usersChanged = new Subject<UserModel[]>();
  userChange = new Subject<UserModel>();

  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  getAll() {


    const req = this.httpClient.get<UserModel[]>( 'admin/users/'  , {
      observe: 'body',
      responseType: 'json',

    }) ;

    return  req;
  }

   getById(id: string)  {


    const req =this.httpClient.get<UserModel>('admin/users/' + id, {
      observe: 'body',
      responseType: 'json',

    }) ;

    return req;
  }

  getByToken( )  {
    


    const req =this.httpClient.get<UserModel>('admin/users/get/' + localStorage.getItem("tokenUser"), {
      observe: 'body',
      responseType: 'json',

    }) ;

    return req;
  }

  addUser(user: UserModel, file) {

    const body = new FormData();

    body.append('fullName', user.fullName);
    body.append('email', user.email);
    body.append('pass', user.pass);
    body.append('avatar', file, file.name);

    const req = new HttpRequest('POST','admin/users/create', body,
    {

      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  updateUser(user: UserModel, file , id: string) {

    const body = new FormData();
    let req;
    if (file) {
      body.append('fullName', user.fullName);
      body.append('pass', user.pass);
      body.append('avatar', file, file.name);
      req = new HttpRequest('POST','admin/users/edit/' + id, body,
        {

          reportProgress: true
        });
    } else if (user.avatar.length > 0) {
      user.avatar = user.avatar.slice(env.assestUrl.length , user.avatar.length);
      req = new HttpRequest('POST','admin/users/edit/' + id, user,
        {

          reportProgress: true
        });
    }
    return this.httpClient.request(req);
  }

  deleteUser(id: string) {
    const req = new HttpRequest('DELETE','admin/users/remove/' + id, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  deleteUserRole(userId :string, roleId : string) {
    const req = new HttpRequest('POST','admin/users/RemoveRole/' ,  {userId : userId,roleId : roleId},
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  addRole(userId :string, roleId : string){



    const req = new HttpRequest('POST','admin/users/AddRole', {userId : userId,roleId : roleId},
    {
       reportProgress: true
    });

    return this.httpClient.request(req);
  }

  changePass(id,pass){



    const req = new HttpRequest('POST','admin/users/changePass', {_id : id,pass : pass},
    {

      reportProgress: true
    });

    return this.httpClient.request(req);
  }
}
