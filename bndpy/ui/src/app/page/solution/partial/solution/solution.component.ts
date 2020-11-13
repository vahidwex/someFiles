import { Component, OnInit } from '@angular/core';
import { TitleUtilityService } from 'src/app/shared/services/utilities/title.service';
import { ActivatedRoute } from '@angular/router';
import { SolutionService } from '../../../../shared/services/api/solution.service';
import { CapabilityService } from '../../../../shared/services/api/capability.service';
import { ENV } from '../../../../shared/values/env';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit {
  item:any='';
  capabilities:any[]=[];
  
  env=ENV

  constructor(
    private TitleUtilityService:TitleUtilityService,
    private route:ActivatedRoute,
    private solutionService:SolutionService,
    private CapabilityService:CapabilityService,
  ) { }
  
  ngOnInit(): void {
    this.TitleUtilityService.add("راه کارها")
    this.route.params.subscribe(({name})=>{
      this.solutionService.GetSolutionBySolutionName(name).subscribe(res=>{
        console.log(res)
        this.item=res[0];
        console.log(this.item);
      })
    })
    this.CapabilityService.GetAll().subscribe(res=>{
      this.capabilities=res;
    })
  }

}
