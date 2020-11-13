import { ModifiedLog } from './modified-log.model';

export class SettingModel {

  constructor(
    public _id: string,
    public logo: string,
    public companyName: string,
    public email: string,
    public tel: string,
    public fax: string,
    public HeaderMessage:string,
    public productHeader:string,
    public educationalSources:string,
    public subeducationalSources:string,
    public customers:string,
    public abutUsFooter:string,
    public footersecoundColumn:string,
    public footerFirstCoumn:string,
    public footerthirdColumn:string,
    public location:string,
    public downFooterText:string,
    public backGround:string,
    public solutionHeader:string,
    public abutUsPage:string,

    
    public addresses: [
      {
        _id: string,
        address: string,
        positionWidth: string,
        positionHeight: string,
      }
    ],
    public socialNetworks: [
      {
        _id: string,
        socialLogo: string,
        title: string,
        link: string
      }
    ],
    public modifiedLog: ModifiedLog[]) { }

}
