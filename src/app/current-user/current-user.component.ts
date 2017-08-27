import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from "rxjs/Rx";

import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthGuard } from '../auth.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent implements OnInit {
  public user: any;
  public gitUser: any;
  public isOpened: Boolean = false;

  constructor(public afAuth: AngularFireAuth, private router: Router, private authGuard: AuthGuard) {
    this.user = afAuth.auth.currentUser;
    this.gitUser = JSON.parse(localStorage.getItem('currentuser'));
  }

  ngOnInit() {
  }

  public logoutUser() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}