import {CapabilityService} from "../../../../../shared/services/api/capability.service"
import { Component, OnInit } from '@angular/core';
import { ENV } from '../../../../../shared/values/env';


@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  env=ENV

items:any[]=[];


constructor(private CapabilityService:CapabilityService) { }

  ngOnInit() {
    this.CapabilityService.GetAll().subscribe(res=>{
      console.log(res)
      this.items=res;
    })
  }

}
