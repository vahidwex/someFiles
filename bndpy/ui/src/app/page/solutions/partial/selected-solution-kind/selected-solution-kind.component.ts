import { Component, OnInit } from '@angular/core';
import { SolutionKindService } from '../../../../shared/services/api/solutionKind.service';
import { ActivatedRoute } from '@angular/router';
import { SolutionService } from '../../../../shared/services/api/solution.service';
import { ENV } from '../../../../shared/values/env';
import { TitleUtilityService } from '../../../../shared/services/utilities/title.service';
@Component({
  selector: 'app-selected-solution-kind',
  templateUrl: './selected-solution-kind.component.html',
  styleUrls: ['./selected-solution-kind.component.scss']
})
export class SelectedSolutionKindComponent implements OnInit {
  
  env=ENV

  constructor(
    private SolutionKindService:SolutionKindService,
    private route:ActivatedRoute,
    private solutionService:SolutionService,
    private TitleUtilityService:TitleUtilityService,

  ) { }
  solutions:any[]=[];
  solutionKind:any='';
  ngOnInit(): void {

    this.route.params.subscribe(({name})=>{
      this.TitleUtilityService.add("نوع راهکار - "+name)
      
      this.solutionService.GetAll().subscribe(res=>{
        
       for (let i = 0; i < res.length; i++) {

         const element = res[i];

         if(element.solutionTypeTitle[0]==name){
            this.solutions.push(element)
         }

       }
      })

      this.SolutionKindService.GetSolutionKindByName(name).subscribe(res=>{
        this.solutionKind=res[0];

      })

    })

  }

}
