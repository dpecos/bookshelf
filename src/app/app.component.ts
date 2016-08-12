import { Component, OnInit } from '@angular/core';

import { MainComponent, NavbarComponent, FooterComponent, ContentComponent, SidebarComponent } from './components';

declare function inspiniaLoad();

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [MainComponent, SidebarComponent, NavbarComponent, FooterComponent, ContentComponent]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    inspiniaLoad();
  }
}
