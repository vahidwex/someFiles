import { Component, OnInit } from '@angular/core';
import { visionMock } from './Mock.vision';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss']
})
export class VisionComponent implements OnInit {

  constructor() { }
  items=visionMock;

  ngOnInit() {
  }

}
