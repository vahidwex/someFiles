import { ClientModel } from './client.model'
import { ProductModel } from './product.model'

export class OrderModel {

    constructor() { }
    _id:string
    products:ProductModel[]
    client:ClientModel
    discount:any
    price:Number
    totalPrice:Number
    status:String
    discountPrice:Number
    paymenID:String
    title:String
    description:String
    lastStatusDate:string
  }
  