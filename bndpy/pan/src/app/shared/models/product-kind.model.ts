import { ModifiedLog } from './modified-log.model';

export class ProductKindModel {

  constructor(
    public _id: string,
    public logo: string,
    public title: string,
    public fatherProductKind : string,
    public tags: string,
    public description: string,
    public modifiedLog: ModifiedLog[]) { }

}
