import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { STRINGS } from '../../values/STRINGS';

@Injectable({
  providedIn: 'root'
})
export class TitleUtilityService {

  constructor(
    private title: Title
  ) { }

  public add(title: string) {
    this.title.setTitle(STRINGS.pageTitle + title);
  }
}
