import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { MdlPopoverModule } from '@angular-mdl/popover';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule }     from './app-routing.module';

import { AuthGuard } from './auth.service';
import { UsersService } from './users.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { CurrentUserComponent } from './current-user/current-user.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SelectedUserComponent } from './selected-user/selected-user.component';
import { EventsReceivedComponent } from './events-received/events-received.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyBsJTFjJAde3c7NnsRBSr_LM8S9t91fAvA',
  authDomain: 'githubauthentication-93e05.firebaseapp.com',
  databaseURL: 'https://githubauthentication-93e05.firebaseio.com',
  storageBucket: '',
  messagingSenderId: '556251376709'
};

@NgModule({
  declarations: [
    CurrentUserComponent,
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    SearchUserComponent,
    StatisticsComponent,
    SelectedUserComponent,
    EventsReceivedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MdlModule,
    MdlSelectModule,
    MdlPopoverModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    AngularFireAuth, 
    AngularFireDatabase, 
    AuthGuard,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }