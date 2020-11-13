import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { settingModel} from '../../models/setting.model';



@Injectable({
  providedIn: 'root'
})
export class ShareSettingService {

    
    myobject:settingModel=new settingModel();
  
  constructor() {
    this.myobject.logo=''
    this.myobject.backGround=''
    this.myobject.companyName=''
    this.myobject.email=''
    this.myobject.tel=''
    this.myobject.fax=''
    this.myobject.HeaderMessage=''
    this.myobject.solutionHeader=''
    this.myobject.productHeader=''
    this.myobject.educationalSources=''
    this.myobject.subeducationalSources=''
    this.myobject.customers=''
    this.myobject.abutUsFooter=''
    this.myobject.footerFirstCoumn=''
    this.myobject.footersecoundColumn=''
    this.myobject.footerthirdColumn=''
    this.myobject.addresses=''
    this.myobject.socialNetworks=''
    this.myobject.location=''
    this.myobject.downFooterText=''
   }
    public settingHolder = new BehaviorSubject(this.myobject)



}
