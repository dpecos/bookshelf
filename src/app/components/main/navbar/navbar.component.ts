import { Component } from '@angular/core';
import { EventBusService } from '../../../services';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent {
  constructor(private eventBus: EventBusService) { }

  triggerFilter(query) {
    this.eventBus.dispatch('filter', query);
  }

}
