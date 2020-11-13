import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { env } from 'src/app/shared/env-consts';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService } from 'src/app/services/setting.service';
import { SettingModel } from 'src/app/shared/models/setting.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../home/home.component.css']
})
export class HeaderComponent implements OnInit {

  companyName = '';
  logoUrl ='';
  constructor(private auService: AuthService,private seSerivce: SettingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.seSerivce.getAll().subscribe((setting: SettingModel[]) =>{
      if(setting[0]){
        this.companyName = setting[0].companyName;


        this.logoUrl =env.assestUrl+ setting[0].logo;
      }
    })
  }

  onLogout() {
    

    this.auService.token = '';
    localStorage.removeItem("tokenUser")
    this.router.navigate(['/login']);

  }
}
