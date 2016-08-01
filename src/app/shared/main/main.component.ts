import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar';
import { FooterComponent } from './footer';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
  directives: [ROUTER_DIRECTIVES, NavbarComponent, FooterComponent]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
