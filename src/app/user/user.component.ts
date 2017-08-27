import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../_animations/index';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}