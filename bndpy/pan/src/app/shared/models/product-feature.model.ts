import { ProductDetailsModel } from './productDetails.model';

export class ProductFeatureModel {
  constructor(
    public _id: string,
    public featureValue: string,
    public productDetail: ProductDetailsModel,
    public isFeature: boolean

    
  ) { }
}

