import { ModifiedLog } from './modified-log.model';

export class SolutionKindModel {

  constructor(
    public _id: string,
    public logo: string,
    public title: string,
    public description:string,
    public tags: string,
    public modifiedLog: ModifiedLog[]) { }

}
