import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar';
import { FooterComponent } from './footer';

@Component({
  moduleId: module.id,
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
  directives: [NavbarComponent, FooterComponent]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
