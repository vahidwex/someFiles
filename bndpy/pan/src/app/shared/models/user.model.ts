

export class UserModel {

  constructor(
    public _id: string,
    public fullName: string,
    public avatar: string,
    public email: string,
    public pass: string,
    public roles: string[]) { }

}
