import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class TitleUtilityService {

  constructor(
    private title: Title
  ) { }

  public add(title: string) {
    this.title.setTitle("بلند پایه -" + title);
  }
}
