import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { OrderModel } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-print-clients',
  templateUrl: './print-clients.component.html',
  styleUrls: ['./print-clients.component.css']
})
export class PrintClientsComponent implements OnInit {

  constructor(
    private orderService:OrderService,
    private route:ActivatedRoute,
    private router:Router
  ) { }
    orders:OrderModel[]
  ngOnInit() {
    this.route.params.subscribe(({ids})=>{
      this.orderService.FindManyByIds(ids).subscribe(res=>{
        this.orders=res['result'];
      })
    })
    
  }
  printableStatus = false;
  print(){
      this.router.navigate(["../"])
      this.printableStatus = true;
      var printable = document.getElementById("printable");
      var newPage = window.open('', '_blank', 'width=793px,height=1122px');
      
      newPage.document.write('<html>  <head> ');
      newPage.document.write('<style>'
      
      +'.section{border: 1px solid gray;border-radius: 0.2em;font-size: 1.4em;padding: 10px;margin: 10px;direction:rtl}'
      
        + '</style>'
      );
      newPage.document.write('</head> <body>')
      newPage.document.write(printable.innerHTML)
      newPage.document.write('</body></html>')
      newPage.print();
      newPage.focus();
    }
  }


