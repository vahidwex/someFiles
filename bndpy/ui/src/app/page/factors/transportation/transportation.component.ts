import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderService } from 'src/app/shared/services/api/order.service';
import { TransportService} from '../../../shared/services/api/transport.service';


@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss']
})
export class TransportationComponent implements OnInit {
  list
  constructor(
    private TransportService:TransportService,
    private orderService:OrderService,
  ) { }
  @Output() transfetCalcPrice = new EventEmitter < object > ();

  @Input() order: any;
  ngOnInit(): void {
    this.TransportService.GetAll().subscribe(res=>{
      this.list=res
    })
  }

  updateTransport(transPortId){
    
    this.orderService.UpdateTransport(this.order._id,transPortId).subscribe(res=>{
      console.log(res)
      this.transfetCalcPrice.emit(res);
    })

  }

}
