import { Component, OnInit } from '@angular/core';
import { BannerModel } from 'src/app/shared/models/banner.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.css']
})
export class BannerListComponent implements OnInit {

  banners: BannerModel[];

  constructor(private route: ActivatedRoute, private router: Router, private bnService: BannerService) { }

  ngOnInit() {
  
    this.getBanners();
  }

  addNew(){
    this.router.navigate([  'new'], { relativeTo: this.route })
  }

  onEdit(id) {
    this.router.navigate([ id, 'edit'], { relativeTo: this.route })
  }

  onDelete(id) {
    this.bnService.deleteBanner(id).subscribe((response)=>{ this.getBanners()
    });
  }

  getBanners(){
    this.bnService.getAll().subscribe( (result: BannerModel[]) => {
      this.banners = result ;

    })
  }
}
