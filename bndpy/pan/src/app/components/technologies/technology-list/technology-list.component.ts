import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnologyModel } from 'src/app/shared/models/technology.model';
import { TechnologyService } from 'src/app/services/technology.service';
import { TechnologyKindModel } from 'src/app/shared/models/technology-kind.model';
import { TechnologyKindService } from 'src/app/services/technology-kind.service';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.css']
})
export class TechnologyListComponent implements OnInit {

  kinds: TechnologyKindModel[];
  technologies: TechnologyModel[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private teService: TechnologyService,
              private tkService: TechnologyKindService) { }

  ngOnInit() {
    this.getTechnologies();
  }

  addNew(){
    this.router.navigate([  'new'], { relativeTo: this.route })
  }

  onEdit(id) {
    this.router.navigate([ id, 'edit'], { relativeTo: this.route })
  }

  onDelete(id) {
    this.teService.deleteTechnology(id).subscribe((response)=>{ this.getTechnologies()
    });
  }

  getTechnologies(){
    this.teService.getAll().subscribe( (result: TechnologyModel[]) => {
      this.technologies = result ;

    });

    this.tkService.getAll().subscribe( (result: TechnologyKindModel[]) => {
      this.kinds = result ;

    });
  }


}
