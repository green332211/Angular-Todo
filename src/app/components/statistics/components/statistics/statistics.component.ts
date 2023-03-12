import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @Input() public totalTasksInCategory: number;
  @Input() public completeTasksInCategory: number;
  @Input() public uncompleteTasksInCategory: number;
  @Input() public showStat: boolean;

  constructor() {
  }

  public ngOnInit() {
  }

}
