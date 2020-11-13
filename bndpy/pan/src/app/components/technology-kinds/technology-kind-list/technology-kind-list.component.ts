import { Component, OnInit } from '@angular/core';
import { TechnologyKindModel } from 'src/app/shared/models/technology-kind.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnologyKindService } from 'src/app/services/technology-kind.service';

@Component({
  selector: 'app-technology-kind-list',
  templateUrl: './technology-kind-list.component.html',
  styleUrls: ['./technology-kind-list.component.css']
})
export class TechnologyKindListComponent implements OnInit {
  technologyKinds: TechnologyKindModel[];

  constructor(private route: ActivatedRoute, private router: Router, private bnService: TechnologyKindService) { }

  ngOnInit() {
    this.getTechnologyKinds();
  }

  addNew(){
    this.router.navigate([  'new'], { relativeTo: this.route })
  }

  onEdit(id) {
    this.router.navigate([ id, 'edit'], { relativeTo: this.route })
  }

  onDelete(id) {
    this.bnService.deleteTechnologyKind(id).subscribe((response)=>{ this.getTechnologyKinds()
    });
  }

  getTechnologyKinds(){
    this.bnService.getAll().subscribe( (result: TechnologyKindModel[]) => {
      this.technologyKinds = result ;

    })
  }


}
