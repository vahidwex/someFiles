import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}


declare var document: any;

@Injectable()
export class DynamicScriptLoaderService {

    public script1 = false;
    public script2 = false;

  public load1() {
      if(this.script1){
          return Promise.resolve(123);
      }
      this.script1 = true;
        return new Promise(resolve => {
            const scriptElement = document.createElement('script');
            scriptElement.src = 'https://js.stripe.com/v3/';
            scriptElement.onload = resolve;
            document.body.appendChild(scriptElement);
      });
  }
  public load2(){
    if(this.script2){
        return Promise.resolve(123);
    }
    this.script2 = true;
    return new Promise(resolve => {
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://checkout.stripe.com/checkout.js';
        scriptElement.onload = resolve;
        document.body.appendChild(scriptElement);
      });
  }

}