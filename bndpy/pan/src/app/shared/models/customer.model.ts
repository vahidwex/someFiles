

import { ModifiedLog } from './modified-log.model';

export class CustomerModel {

  constructor(
    public _id: string,

    public logo: string,
    public title: string,
    public tel: string,
    public site: string,
    public email: string,
    public manager: string,
    public productsBuyed: string[],
    public addresses: [
      {
        address: string,
        posWidth: string,
        posHeight: string
      }
    ],
    public modifiedLog: ModifiedLog[]
  ) { }

}
