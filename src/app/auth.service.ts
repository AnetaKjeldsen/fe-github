import { CanActivate, Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
    public token: String = "";
    public gitUser: Object;

    constructor(private auth: AngularFireAuth, private router: Router) {}

    public canActivate(): Observable<boolean> {
      return Observable.from(this.auth.authState)
        .map(state => !!state)
        .do(authenticated => {
					if (!authenticated) {
						this.router.navigate([ '/login' ]);
					}
          if(!this.token || this.token == ""){
            this.router.navigateByUrl('/login');
          }
				});
    }
}