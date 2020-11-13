import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ClientService } from '../../api/client.service';
import { CookieUtilitieService } from '../../utility/cockie.service';



@Injectable({
  providedIn: 'root'
})
export class FactorPreviewGuard {

  constructor(private router: Router,
              private ClientService:ClientService,
              private cookieService:CookieUtilitieService,
  ) { }

    selectedProductsOBJ

    answer=new Subject<boolean>();
    canActivate():Observable<boolean>|boolean {
        
        

        
    this.ClientService.CheckToken(localStorage.getItem("userToken")).subscribe(res=>{

            this.selectedProductsOBJ=this.cookieService.formToObject();
            if(this.selectedProductsOBJ.selectedProducts){

                if(res && res==true && !!JSON.parse(this.selectedProductsOBJ.selectedProducts).length){
                    console.log("in true")
                    this.answer.next(true)
                }else{
                    this.router.navigate(["home"])
                    this.answer.next(false)
                }

            }
            
        })
        return this.answer

    }

}