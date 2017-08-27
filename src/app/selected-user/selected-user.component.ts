import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { fadeInAnimation } from '../_animations/index';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-selected-user',
  templateUrl: './selected-user.component.html',
  styleUrls: ['./selected-user.component.scss'],
  animations: [fadeInAnimation]
})
export class SelectedUserComponent implements OnInit {

  private username: string;
  public selectedUser: any; 
  public selectedUserDisplayName: string = "";

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.paramMap
        .switchMap((params: ParamMap) => this.usersService.getUser(params.get('username')))
        .subscribe(userDatils => {
            this.selectedUser = userDatils;
            this.selectedUserDisplayName = this.selectedUser.name ? this.selectedUser.name : this.selectedUser.login;
          },
          error => {
            console.error(error);
          }
        );
    }
}