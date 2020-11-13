import { ModifiedLog } from './modified-log.model';

export class TechnologyModel {

  constructor(
    public _id: string,
    public title: string,
    public image: string,
    public description: string,
    public kind: string,
    public wikiLink: string,
    public modifiedLog: ModifiedLog[]) { }

}
