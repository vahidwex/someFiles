import { ModifiedLog } from './modified-log.model';

export class BannerModel {

  constructor(
    public _id:string,
    public title: string,
    public image: string,
    public description: string,
    public link: string ) { }

}
