import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CapabilityModel } from 'src/app/shared/models/capability.model';
import { CapabilityService } from 'src/app/services/capability.service';
import { CapabilityKindModel } from 'src/app/shared/models/capability-kind.model';
import { CapabilityKindService } from 'src/app/services/capability-kind.service';

@Component({
  selector: 'app-capability-list',
  templateUrl: './capability-list.component.html',
  styleUrls: ['./capability-list.component.css']
})
export class CapabilityListComponent implements OnInit {

  kinds: CapabilityKindModel[];
  Capabilities: CapabilityModel[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private caService: CapabilityService,
              private ckService: CapabilityKindService) { }

  ngOnInit() {
    this.getCapabilities();
  }

  addNew(){
    this.router.navigate([  'new'], { relativeTo: this.route })
  }

  onEdit(id) {
    this.router.navigate([ id, 'edit'], { relativeTo: this.route })
  }

  onDelete(id) {
    this.caService.deleteCapability(id).subscribe((response)=>{ this.getCapabilities()
    });
  }

  getCapabilities(){
    this.caService.getAll().subscribe( (result: CapabilityModel[]) => {
      this.Capabilities = result ;

    })
    this.ckService.getAll().subscribe( (result: CapabilityKindModel[]) => {
      this.kinds = result ;

    })
  }

}
