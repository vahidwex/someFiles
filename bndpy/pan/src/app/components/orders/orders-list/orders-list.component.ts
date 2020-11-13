import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { OrderModel } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  constructor(
    private orderService:OrderService,
    private router:Router
  ) { }
    disableNext=false;
    disablePrev=false;

    disableUpdate=true;
    selectedIds:string ='';
    orders:OrderModel[]
    skip=0;
    limit=10
    status="pending"
    StatusEdit="pending"
    

  ngOnInit() {
    this.getbyStatus();
   
  }
  changelimit(event){
    // console.log(event)
    this.limit=parseInt(event.target.value)
    this.getbyStatus();
  }
  getbyStatus(){
    this.orderService.GetByStatusOrder (this.status,  this.limit , this.skip*this.limit).subscribe(res=>{
      console.log(res)
      this.orders=res;
      if(res.length<this.limit){
        this.disableNext=true;
      }else{
        this.disableNext=false;
      }
    })
  }
  next(){    
    if(this.skip!=1){
      this.disablePrev=false;
    }
      this.skip+=1;
      this.getbyStatus();
  }
  prev(){

    if(this.skip==1){
      this.disablePrev=true;
    }

    if(this.skip<=0){
      return
    }
    this.skip-=1;
    this.getbyStatus();
  }
  onEdit(id){
    this.disableUpdate=false
    this.selectedIds=id;
  }
  
  onDetail(){

  }

  changeStatus(event){
    this.skip=0;
    this.status=event.target.value
    this.getbyStatus();
  } 

  changeStatusEdit(event){
    this.StatusEdit=event.target.value
    this.getbyStatus();
  } 
  changeCheckbox(event,id){
    
    let a='';

    if(event.target.checked==true){
      
      if(this.selectedIds==''){
        a=this.selectedIds.concat(id);

      }else{
        a=this.selectedIds.concat(",",id);
      }
    }else if(event.target.checked==false){

      let indexofHolder=this.selectedIds.indexOf(id)
      if(this.selectedIds.indexOf(",")<0){
        a=''
      }
      else if(indexofHolder==0){
        a=this.selectedIds.replace(id+",",'')
      }
      else if(this.selectedIds.search(",")>0){
        a=this.selectedIds.replace(","+id,'')
      }
    }
    this.selectedIds=a;
    console.log(this.selectedIds)
  }
  getDataforPrint(){

    this.router.navigate(["order","printClient",this.selectedIds],)
  }
  Update(){
    this.disableUpdate=true;
    this.orderService.EditStatus(this.StatusEdit,this.selectedIds).subscribe(res=>{
      this.orders=res
      this.selectedIds=""
      this.getbyStatus();
    })
  }
}
