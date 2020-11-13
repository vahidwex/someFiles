import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { TitleUtilityService } from 'src/app/shared/services/utilities/title.service';
import { ClientService } from 'src/app/shared/services/api/client.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-poersonal-data',
  templateUrl: './poersonal-data.component.html',
  styleUrls: ['./poersonal-data.component.scss']
})
export class PoersonalDataComponent implements OnInit {

  constructor(
    private TitleUtilityService:TitleUtilityService,
    private clientservice:ClientService,
    private router:Router
  ) { }


  clientForm: FormGroup;
  
  ngOnInit(): void {
    // if(localStorage.getItem("userToken")){
    //   this.router.navigate(['/'])
    // }
    this.TitleUtilityService.add("اطلاعات پستی")

    this.clientForm = new FormGroup({

      
      name: new FormControl('', Validators.required),
      family: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      mobile: new FormControl("",[Validators.required,Validators.compose([
          Validators.minLength(11),
          Validators.maxLength(11)
        ])
      ]),
      address: new FormControl('', Validators.required),
    });

  }
  
  onSubmit(){

    if(this.clientForm.status!="VALID"){
      return
    }else{

      this.clientservice.CerateClient(this.clientForm.value).subscribe(res=>{
        localStorage.setItem("userToken", res.token);
        this.router.navigate(['factor','preview'])
      })

    }
    
  }
  
}
