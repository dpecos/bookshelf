import { Component } from '@angular/core';

import { MainComponent, SidebarComponent } from './shared';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [MainComponent, SidebarComponent]
})
export class AppComponent {
  title = 'app works!';
}
