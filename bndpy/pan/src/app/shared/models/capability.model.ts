import { ModifiedLog } from './modified-log.model';

export class CapabilityModel {
  constructor(
    public _id:string,
    public logo: string,
    public title: string,
    public kind: string,
    public tags: string,
    public modifiedLog: ModifiedLog[]) { }

}
