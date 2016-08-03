import { Component, OnInit } from '@angular/core';

import { MainComponent, SidebarComponent } from './shared';

declare function inspiniaLoad();

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [MainComponent, SidebarComponent]
})
export class AppComponent implements OnInit {
  title = 'app works!';
  ngOnInit() {
    inspiniaLoad();
  }
}
