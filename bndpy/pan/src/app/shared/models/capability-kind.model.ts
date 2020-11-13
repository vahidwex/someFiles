import { ModifiedLog } from './modified-log.model';

export class CapabilityKindModel {

  constructor(
    public _id: string,
    public logo: string,
    public title: string,
    public tags: string,
    public modifiedLog: ModifiedLog[]) { }

}
