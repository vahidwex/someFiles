import { ModifiedLog } from './modified-log.model';

export class SolutionModel {

  constructor(
    public _id: string,
    public logo: string,
    public title: string,
    public description: string,
    public titleEnglish: string,
    public kind: string,
    public products: string[],
    public tags: string,
    public modifiedLog: ModifiedLog[]) { }

}
