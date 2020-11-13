

export class StoresModel {

    constructor() { }
    _id:string
    productDetailKind:string
    logo:string
    title:string
    banners:BannerOfStoreModel[]
    description:string
  }

  export class BannerOfStoreModel {

    constructor() { }
    _id:string
    image:string
    title:string
    desc:string
  }


  