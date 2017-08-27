import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import * as moment from 'moment';

import { fadeInAnimation } from '../_animations/index';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  providers: [UsersService],
  animations: [fadeInAnimation]
})
export class StatisticsComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  private username: string;

  public lineChartDataset: Array<any> = [{ label: '# of comits per day', data: [0, 0, 0, 0, 0, 0, 0] }];
  public lineChartLabels: Array<any> = ['1', '2', '3', '4', '5', '6', '7'];
  public lineChartType: string = 'line';
  public lineChartOptions: Object = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]  
    }
  };
  
  public weeksSelection: Array<any> = [
    {name: 'Recent week', code: 1}, 
    {name: 'Recent 2 weeks', code: 2},
    {name: 'Recent 4 weeks', code: 4},
    {name: 'Recent 8 weeks', code: 8},
    {name: 'Recent 16 weeks', code: 16},
    {name: 'Recent 32 weeks', code: 32}];
  public selectedWeek;

  public statisticsReady = false;

  private allReposGroupped: any;
  public selectedUserStatistics: Array<any> = [];

  constructor(private usersService: UsersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username']; 
      this.usersService.getUserStatistics(this.username).subscribe(userReposStat => {         
          this.mergeStatisticsData(userReposStat);
      });
    });
  }

  private mergeStatisticsData(data) {
    let allRepos = [];
    for (let repos of data){
      if(repos){
        for (let item of repos){
          allRepos.push({week: item.week, days: item.days});
        }
      }
    }
    this.allReposGroupped = this.groupByWeek(allRepos,'week');

    Object.keys(this.allReposGroupped).forEach(element => {
      let total = this.allReposGroupped[element].reduce(function(a, b){
          return a.map(function(v,i){
              return v+b[i];
          });
      });

      this.selectedUserStatistics.push({week: element, days: total});
    }); 
    this.selectedUserStatistics = this.selectedUserStatistics.reverse();
    if(this.selectedUserStatistics.length > 0){
      this.statisticsReady = true;
      this.selectedWeek = 1;
    }
    console.log("selectedUserStatistics for" + this.username);
    console.log(this.selectedUserStatistics);
  }

  private groupByWeek(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x.days);
      return rv;
    }, {});
  };

  private getLineChartData(item: number){
    let data;
    for (let i = 0; i < item; i++) {
      let a = this.selectedUserStatistics[i].days;
      if(i === 0){
        data = a;
      } else {
        data = data.concat(a);
      }
    }
    return data;
  }

  private getLineChartLabels(item: number){
    let labels = [];
    let l = item * 7;
    for (let i = 0; i < l; i++) {
      labels.push(i+1);
    }
    return labels;
  }

  public onWeekChange(newWeek) {
    if(newWeek){
      this.selectedWeek = newWeek;
      this.lineChartDataset[0].data = this.getLineChartData(this.selectedWeek);
      this.lineChartLabels = this.getLineChartLabels(this.selectedWeek);
      this.refresh_chart();
    }
  }

  private refresh_chart() {
    setTimeout(() => {
        if (this.chart && this.chart.chart && this.chart.chart.config) {
          this.chart.chart.config.data.labels = this.lineChartLabels;
          this.chart.chart.update();
        }
    });
  }
}