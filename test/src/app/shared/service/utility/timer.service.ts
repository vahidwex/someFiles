import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  interval(cb, time) {
    if(isPlatformBrowser(this.platformId)) {
      setInterval(cb, time);
    }
  }

  timeout(cb, time) {
    if(isPlatformBrowser(this.platformId)) {
      setTimeout(cb, time);
    }
  }
}
