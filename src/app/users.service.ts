import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthGuard } from './auth.service';

@Injectable()
export class UsersService {

  private githubPublicApiUrl = 'https://api.github.com';
  private clientId = "463ec9bae88d208dbfec";
  private clientSecret = "5e2b3373fe7617fb4f31e4139f58073082fc90ca";
  public options;

  constructor(private http: Http, private authGuard: AuthGuard, private router: Router) {
    this.options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'token ' + this.authGuard.token }) });
  }

  public getUser(username: string) {
    if (username) {
      const url = `${this.githubPublicApiUrl}/users/${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`;
      return this.http.get(url, this.options)
        .map((response: Response) => response.json())
        .catch(this.errorHandler);
    }
  }

  public getUserStatistics(username: string): Observable<any> {
    if (username) {
      const url = `${this.githubPublicApiUrl}/users/${username}/repos?client_id=${this.clientId}&client_secret=${this.clientSecret}`;
      return this.http.get(url, this.options)
        .map((res: any) => res.json())
        .flatMap((repos: any[]) => {
          if (repos.length > 0) {
            return Observable.forkJoin(
            repos.map((repo: any) => {
              const urlRepo = `${this.githubPublicApiUrl}/repos/${username}/${repo.name}/stats/commit_activity?client_id=${this.clientId}&client_secret=${this.clientSecret}`;            
              return this.http.get(urlRepo, this.options)
                .delay(700)
                .map((res: any) => {
                  let stats: any = res.json();
                  if(stats && stats.length > 0){
                    let takeResults = stats.slice(-32);
                    return takeResults;
                  } 
                });
            }))
          }
          return Observable.of([]);
        });
    }
  }

  public getTopUsers(username: string, page: number) {
    if (username) {
      const url = `${this.githubPublicApiUrl}/users/${username}/received_events/public?page=${page}client_id=${this.clientId}&client_secret=${this.clientSecret}`;
      return this.http.get(url, this.options)
        .map((response: Response) => response.json())
        .catch(this.errorHandler);
    }
  }

  public searchUser(term: string, page: number) {
		if (term) {
      let pageUrl = page != null ? `&page=${page}` : "";
      const url = `${this.githubPublicApiUrl}/search/users?q=${term}+in:fullname+in:login+in:email${pageUrl}&client_id=${this.clientId}&client_secret=${this.clientSecret}`;
      return this.http.get(url, this.options)
        .map((response: Response) => {
          return response.json()
        })
        .catch(this.errorHandler);
    }
  }

  private errorHandler(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

