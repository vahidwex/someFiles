import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable()

export class HelperFunction {

  constructor(private location: Location) {
  }

  /**
   * This method will change page query params.
   *
   * @param route
   * @param params
   * @returns {boolean}
   */
  public changeRouteParams(route, params: any) {

    let urlParams: any[] = [];
    for (let key in params) {
      urlParams.push(key + '=' + params[key]);
    }
    let queryString = urlParams.length > 0 ? '?' + urlParams.join('&') : '';
    let url = route + queryString;
    this.location.go(url);
    return true;
  }

  /**
   * This method will create slug to use in routes.
   *
   * @param name
   */
  public createPageSlug(name) {
    if (!name) {
      return 'Podcast';
    }
    return name
      .replace(/\s+/g, '-')
      .replace(/[0-9]/gi, '-')
      .replace(/\//g, '-')
      .replace(/\\/g, '-')
      .replace(/\\/g, '-')
      .replace(/[)(_;:|,.&*%]/g, '-')
      .replace(/-$/g, '')
      .replace(/^-/g, '')
      .replace(/\-\-/gi, ' ');
  }

  /**
   * this method will return true if identifier was email.
   *
   * @param data
   * @returns {boolean}
   */
  public identifierIsEmail(data) {
    return (data.indexOf('@') > 0)
  }

}
