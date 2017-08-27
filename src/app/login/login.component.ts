import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthGuard } from '../auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  public error: any;

  constructor(private afAuth: AngularFireAuth, private router: Router, private authGuard: AuthGuard) {
  }

  ngOnInit() {
  }

  public loginUser(name: object) {
    let provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    this.afAuth.auth.signInWithPopup(provider).then(res => {
      this.authGuard.token = res.credential.accessToken;     
      localStorage.setItem('currentuser', JSON.stringify(res.additionalUserInfo.profile));
      this.router.navigateByUrl('/dashboard');
    }).catch((err) => { this.error = err;});
  }

}
