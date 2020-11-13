import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransportService } from 'src/app/services/transport.service';
import { TransportModel } from 'src/app/shared/models/transport.model';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  transports: TransportModel[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private trService: TransportService
              ) { }

  ngOnInit() {
    this.gettransports();
  }

  addNew(){
    this.router.navigate([  'new'], { relativeTo: this.route })
  }

  onEdit(id) {
    this.router.navigate([ id, 'edit'], { relativeTo: this.route })
  }

  onDelete(id) {
    this.trService.Remove(id).subscribe((response)=>{ this.gettransports()
    });
  }

  gettransports(){
    this.trService.GetAll().subscribe( (result: TransportModel[]) => {
      this.transports = result ;

    });

   
  }
}
