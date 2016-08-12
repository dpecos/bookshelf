import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';


export class BusEvent {
  constructor(public type: String, public value: any) {
  }
}

@Injectable()
export class EventBusService {

  private bus: Subject<BusEvent> = new Subject<BusEvent>();

  constructor() {
    this.listen('filter').subscribe(ev => console.log('EVENT: ' + JSON.stringify(ev)));
  }

  dispatch(type: string, value: any) {
    const ev = new BusEvent(type, value);
    this.bus.next(ev);
  }

  listen(type: string): Observable<BusEvent> {
    return this.bus.filter(ev => ev.type === type);
  }

}
