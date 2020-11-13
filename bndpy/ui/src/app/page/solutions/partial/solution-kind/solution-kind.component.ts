import { Component, OnInit } from '@angular/core';
import { CapabilityService } from '../../../../shared/services/api/capability.service';
import { SolutionKindService } from '../../../../shared/services/api/solutionKind.service';
import { ENV } from '../../../../shared/values/env';
import { TitleUtilityService } from '../../../../shared/services/utilities/title.service';
@Component({
  selector: 'app-solution-kind',
  templateUrl: './solution-kind.component.html',
  styleUrls: ['./solution-kind.component.scss']
})
export class SolutionKindComponent implements OnInit {
  
  env=ENV

  capabilities:any[]=[];
  Sk:any[]=[];
  constructor(
    private CapabilityService:CapabilityService,
    private SolutionKindService:SolutionKindService,
    private TitleUtilityService:TitleUtilityService,

  ) { }

  ngOnInit(): void {
    this.TitleUtilityService.add("انواع راهکار ها")

    this.CapabilityService.GetAll().subscribe(res=>{
      this.capabilities=res;
    })
    this.SolutionKindService.GetAll().subscribe(res=>{
      this.Sk=res
      console.log(res)
    })
  }
}
