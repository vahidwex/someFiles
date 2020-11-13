import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SolutionModel } from 'src/app/shared/models/solution.model';
import { SolutionService } from 'src/app/services/solution.service';
import { SolutionKindModel } from 'src/app/shared/models/solution-kind.model';
import { SolutionKindService } from 'src/app/services/solution-kind.service';

@Component({
  selector: 'app-solution-list',
  templateUrl: './solution-list.component.html',
  styleUrls: ['./solution-list.component.css']
})
export class SolutionListComponent implements OnInit {

  solutions: SolutionModel[];
  kinds: SolutionKindModel[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private soService: SolutionService,
              private skService: SolutionKindService) { }

  ngOnInit() {
    this.getSolutions();
  }

  addNew() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  onEdit(id) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route })
  }

  onDelete(id) {
    this.soService.deleteSolution(id).subscribe((response) => {
      this.getSolutions()
    });
  }

  getSolutions() {
    this.soService.getAll().subscribe((result: SolutionModel[]) => {
      this.solutions = result;

    });
    this.skService.getAll().subscribe((result: SolutionKindModel[]) => {
      this.kinds = result;

    })
  }
  onAddProducts(id){
    this.router.navigate([id,'products'],{relativeTo: this.route})
  }

}
