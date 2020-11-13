import { Component, OnInit } from '@angular/core';
import { CapabilityKindModel } from 'src/app/shared/models/capability-kind.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CapabilityKindService } from 'src/app/services/capability-kind.service';

@Component({
  selector: 'app-capability-kind-list',
  templateUrl: './capability-kind-list.component.html',
  styleUrls: ['./capability-kind-list.component.css']
})
export class CapabilityKindListComponent implements OnInit {

  

  capabilityKinds: CapabilityKindModel[];

  constructor(private route: ActivatedRoute, private router: Router, private bnService: CapabilityKindService) { }

  ngOnInit() {
    this.getCapabilityKinds();
  }

  addNew(){
    this.router.navigate([  'new'], { relativeTo: this.route })
  }

  onEdit(id) {
    this.router.navigate([ id, 'edit'], { relativeTo: this.route })
  }

  onDelete(id) {
    this.bnService.deleteCapabilityKind(id).subscribe((response)=>{ this.getCapabilityKinds()
    });
  }

  getCapabilityKinds(){
    this.bnService.getAll().subscribe( (result: CapabilityKindModel[]) => {
      this.capabilityKinds = result ;

    })
  }

}
