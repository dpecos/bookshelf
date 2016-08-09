import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
