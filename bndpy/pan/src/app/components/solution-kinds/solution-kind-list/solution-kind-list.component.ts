import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SolutionKindModel } from 'src/app/shared/models/solution-kind.model';
import { SolutionKindService } from 'src/app/services/solution-kind.service';

@Component({
  selector: 'app-solution-kind-list',
  templateUrl: './solution-kind-list.component.html',
  styleUrls: ['./solution-kind-list.component.css']
})
export class SolutionKindListComponent implements OnInit {

  solutionKinds: SolutionKindModel[];

  constructor(private route: ActivatedRoute, private router: Router, private skService: SolutionKindService) { }

  ngOnInit() {
    this.getSolutionKinds();
  }

  addNew(){
    this.router.navigate([  'new'], { relativeTo: this.route })
  }

  onEdit(id) {
    this.router.navigate([ id, 'edit'], { relativeTo: this.route })
  }

  onDelete(id) {
    this.skService.deleteSolutionKind(id).subscribe((response)=>{ this.getSolutionKinds()
    });
  }

  getSolutionKinds(){
    this.skService.getAll().subscribe( (result: SolutionKindModel[]) => {
      this.solutionKinds = result ;

    })
  }


}
