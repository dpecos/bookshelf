import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
