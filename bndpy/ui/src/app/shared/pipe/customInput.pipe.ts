import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputCustomize'
})
export class inputCustomize implements PipeTransform {
  result:string
  lastPart:string
  transform(value: any, ...args: any[]): any {
    if(value==undefined){
      return
    }else{
      value=value.toString();
      value = value.split(',').join('');
    }
    let length =value.length;
    
    if(length<=3){

      this.result=value;
      
      return this.result ;

    }else if(length<=6){

      
      let part1=value[length-3].concat(value[length-2]).concat(value[length-1]);
      if(value[length-6]!=undefined&&value[length-5]!=undefined&&value[length-4]!=undefined){
        this.lastPart=value[length-6].concat(value[length-5]).concat(value[length-4]);
      }else if(value[length-6]==undefined&&value[length-5]==undefined){
        this.lastPart=value[length-4]
      }else if(value[length-6]==undefined){
        this.lastPart=value[length-5].concat(value[length-4])
      }

      this.result=this.lastPart+","+part1;

        return this.result ;
      
    }else if(length<=9){

      
      let part2=value[length-6].concat(value[length-5]).concat(value[length-4]);
      let part1=value[length-3].concat(value[length-2]).concat(value[length-1]);

      if(value[length-9]!=undefined&&value[length-8]!=undefined&&value[length-7]!=undefined){
        this.lastPart=value[length-9].concat(value[length-8]).concat(value[length-7]);
      }else if(value[length-9]==undefined&&value[length-8]==undefined){
        this.lastPart=value[length-7]
      }else if(value[length-9]==undefined){
        this.lastPart=value[length-8].concat(value[length-7])
      }

      this.result=this.lastPart+","+part2+","+part1;

        return this.result ;

    }else if(length<=12){
      
      let part3=value[length-9].concat(value[length-8]).concat(value[length-7]);
      let part2=value[length-6].concat(value[length-5]).concat(value[length-4]);
      let part1=value[length-3].concat(value[length-2]).concat(value[length-1]);

      if(value[length-10]!=undefined&&value[length-11]!=undefined&&value[length-12]!=undefined){
        this.lastPart=value[length-12].concat(value[length-11]).concat(value[length-10]);
      }else if(value[length-12]==undefined&&value[length-11]==undefined){
        this.lastPart=value[length-10]
      }else if(value[length-12]==undefined){
        this.lastPart=value[length-11].concat(value[length-10])
      }

      this.result=this.lastPart+","+part3+","+part2+","+part1;

        return this.result ;

    }else if(length<=15){
      
      
      let part4=value[length-12].concat(value[length-11]).concat(value[length-10]);
      let part3=value[length-9].concat(value[length-8]).concat(value[length-7]);
      let part2=value[length-6].concat(value[length-5]).concat(value[length-4]);
      let part1=value[length-3].concat(value[length-2]).concat(value[length-1]);

      if(value[length-15]!=undefined&&value[length-14]!=undefined&&value[length-13]!=undefined){
        this.lastPart=value[length-15].concat(value[length-14]).concat(value[length-13]);
      }else if(value[length-15]==undefined&&value[length-14]==undefined){
        this.lastPart=value[length-13]
      }else if(value[length-15]==undefined){
        this.lastPart=value[length-14].concat(value[length-13])
      }

      this.result=this.lastPart+","+part4+","+part3+","+part2+","+part1;

        return this.result ;

    }else if(length<=18){
      
      let part5=value[length-15].concat(value[length-14]).concat(value[length-13]);
      let part4=value[length-12].concat(value[length-11]).concat(value[length-10]);
      let part3=value[length-9].concat(value[length-8]).concat(value[length-7]);
      let part2=value[length-6].concat(value[length-5]).concat(value[length-4]);
      let part1=value[length-3].concat(value[length-2]).concat(value[length-1]);

      if(value[length-18]!=undefined&&value[length-17]!=undefined&&value[length-16]!=undefined){
        this.lastPart=value[length-18].concat(value[length-17]).concat(value[length-16]);
      }else if(value[length-18]==undefined&&value[length-17]==undefined){
        this.lastPart=value[length-16]
      }else if(value[length-18]==undefined){
        this.lastPart=value[length-17].concat(value[length-16])
      }

      this.result=this.lastPart+","+part5+","+part4+","+part3+","+part2+","+part1;

      return this.result ;
    }
  }

}
