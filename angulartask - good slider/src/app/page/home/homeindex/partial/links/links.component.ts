import { Component, OnInit } from '@angular/core';
import { linksMock } from './Mock.links';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  constructor() { }
  items=linksMock;
  ngOnInit() {
  }

}
