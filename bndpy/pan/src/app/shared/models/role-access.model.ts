export class RoleAccessModel {

  constructor(
    public _id: string,
    public access: string,
    public isAuthorized: boolean
  ) { }

}
