import { ModifiedLog } from './modified-log.model';
import { ProductBannerModel } from './product-banner.model';
import { ProductAdvantageModel } from './product-advantage.model';
import { ProductFeatureModel } from './product-feature.model';
import { ProductEducationalSourceModel } from './product-educationalSource.model';
import { ProductKindModel } from './product-kind.model';
import { RevisionModel } from './Revision.model';

export class ProductModel {

  constructor(

    public _id:any,

    public discountPercent:string,
    public productCode:string,
    public productPoint:string,
    public priority:string,
    public exist:string,

    public count:number,
    public titleEnglish: string,
    public logo: string,
    public title: string,
    public shortDesc: string,
    public LongDesc: string,
    public productKind:string,
    public like:string,
    public bazdid:string,
    public price:string,
    public offPrice:string,
    public sellCount:string,
    public technologies: string[],
    public educationalSources: ProductEducationalSourceModel[],
    public banners: ProductBannerModel[],
    public advantages: ProductAdvantageModel[],
    public features: ProductFeatureModel[],
    public modifiedLog: ModifiedLog[],
    public revision: RevisionModel,

    
    
    
    ) { }

}
