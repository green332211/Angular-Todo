import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent implements OnInit {
  @Input() public completed = false;
  @Input() public iconName: string;
  @Input() public count1: number | string;
  @Input() public countTotal: number | string;
  @Input() public title: string;

  constructor() {
  }

  public ngOnInit() {
  }
}
