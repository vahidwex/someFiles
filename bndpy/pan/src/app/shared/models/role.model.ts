import { RoleAccessModel } from './role-access.model';


export class RoleModel {

  constructor(
    public _id: string,
    public title: string,
    public accesses: RoleAccessModel[]) { }

}
