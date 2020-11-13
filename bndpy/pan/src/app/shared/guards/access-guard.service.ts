import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AccessService } from 'src/app/services/access.service';
@Injectable({
  providedIn: 'root'
})
export class AccessGuard {

  answer=new Subject<boolean>();

  constructor(
    private router: Router,
    private accessService:AccessService,
    ) { }
    
  canActivate(isAllowedInput:ActivatedRouteSnapshot):Observable<boolean>|boolean {
      // console.log("in Guard")
    this.accessService.CheckAccess(isAllowedInput.data.roles).subscribe(res=>{
      // console.log(res)
      if (res) {
        this.answer.next(true)
        return true
      }else{
        this.router.navigate(["/"])
        this.answer.next(false)
        return false
      }
    })
    return this.answer
  }
}