import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { fadeInAnimation } from '../_animations/index';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-events-received',
  templateUrl: './events-received.component.html',
  styleUrls: ['./events-received.component.scss'],
  animations: [fadeInAnimation]
})
export class EventsReceivedComponent implements OnInit {

  private username: string;
  public eventsReceived: Array<Object> = [];
  public topUsers: Array<any> = [];
  private eventsiteration = 5;

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
      this.route.paramMap
        .switchMap((params: ParamMap) => {
          let observableBatch = [];
          for (let i = 0; i < this.eventsiteration; i++) {
            observableBatch.push(this.usersService.getTopUsers(params.get('username'),i));
          }
          return Observable.forkJoin(observableBatch)
        })
        .subscribe((resps) => {
          resps.forEach((resp, i) => {
            this.mergeEventsData(resp);
          });

          this.groupByActor((data)=>{
            this.topUsers = data;
          });
          if(this.topUsers){
            this.topUsers = this.topUsers.sort(this.dynamicSort("count", -1)).slice(0,10);
          }
        })
  }

  private dynamicSort(property, sortOrder) {
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
  }

  private mergeEventsData(data: any) {
    for (let item of data){
      this.eventsReceived.push({actor: item.actor.display_login});
    }
  }

  private groupByActor(callback: (data) => void) {
    Observable.from(this.eventsReceived)
      .scan((acc, curr) => {
        const actor = curr["actor"];
        const count = acc[actor] ? acc[actor].count : 0;
        return Object.assign(acc, {
          [actor]: { actor, count: count + 1 }
        });
      }, {})
      .map((obj) => {
        const keys = Object.keys(obj);
        return keys.reduce((acc, curr) => [...acc, obj[curr]], []);
      })
      .distinctUntilChanged()
      .subscribe((res) => {
        callback(res);
      });
  }
}