import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CookieUtilitieService {

  constructor(
   
  ) { }

  public formToObject() {

    return document.cookie.split(';')
    .map(cookie => cookie.split('='))
    .reduce(
        (accumulator, [key, value])=>({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {}
        );
  }
}
