import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { fadeInAnimation } from '../_animations/index';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
  providers: [UsersService],
  animations: [fadeInAnimation]
})
export class SearchUserComponent implements OnInit {
  
  private subject: Subject<string> = new Subject();
  private searchTerm: Observable<string>;
  private searchTermValue: string;
  private page: number = 1;

  public moreResults: Boolean = false;
  public noResultsFound: Boolean = false;
  public loading: Boolean = false;

  public results: Array<string> = [];

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.subject
      .debounceTime(700)
      .distinctUntilChanged()
      .subscribe((searchTextValue)  => { 
        this.results = [];
        this.page = 1;
        this.searchTermValue = searchTextValue;
        this.searchUser(searchTextValue);
      });
  }

  public search(searchTextValue : string): void {
    this.subject.next(searchTextValue);
  }

  private searchUser(term: string) {
    if (term) {
      this.loading = true;
      this.moreResults = false;
      this.usersService.searchUser(term, this.page).subscribe(
        (users) => {
          this.results = this.results.concat(users.items);
          this.noResultsFound = this.results.length == 0 ? true : false;
          this.moreResults = users.total_count > this.page * 30 ? true : false;
          this.loading = false;
        },
        error => {
          this.results = [];
        }
      )
    }
  }

  private loadMoreUsers(){
    this.page += 1;
    this.searchUser(this.searchTermValue);
  }
}
