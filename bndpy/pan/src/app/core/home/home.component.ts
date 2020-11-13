import { Component, OnInit } from '@angular/core';
import { env } from 'src/app/shared/env-consts';
import { AuthService } from 'src/app/services/auth.service';
import { SettingService } from 'src/app/services/setting.service';
import { SettingModel } from 'src/app/shared/models/setting.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private seSerivce: SettingService) { }

  ngOnInit() {


  }

}
