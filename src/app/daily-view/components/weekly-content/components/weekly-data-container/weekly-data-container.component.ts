import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'weekly-data-container',
  templateUrl: './weekly-data-container.component.html',
  styleUrls: ['./weekly-data-container.component.scss']
})
export class WeeklyDataContainerComponent implements OnInit {

  @Input() data: any;
  @Input() primaryField: any;
  @Input() days: number[];

  expanded = true;

  constructor() {
  }

  ngOnInit() {
    console.log(this.days);
  }

}
