import { Component, OnInit } from '@angular/core';
import { TitleUtilityService } from '../../../shared/services/utilities/title.service';
@Component({
  selector: 'app-homeindex',
  templateUrl: './homeindex.component.html',
  styleUrls: ['./homeindex.component.scss']
})
export class HomeindexComponent implements OnInit {

  constructor(
    private TitleUtilityService:TitleUtilityService
  ) { }

  ngOnInit() {
    this.TitleUtilityService.add("صفحه اصلی")
  }

}
