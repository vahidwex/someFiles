import { ModifiedLog } from './modified-log.model';

export class FeatureKindModel {

  constructor(
    public _id: string,
    public logo: string,
    public title: string,
    public modifiedLog: ModifiedLog[]) { }

}
