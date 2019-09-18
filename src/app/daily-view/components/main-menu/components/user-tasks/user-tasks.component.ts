import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DailyViewService} from '../../../../../services/daily-view.service';

@Component({
  selector: 'user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserTasksComponent implements OnInit {
  tasks: any[];

  constructor(private _dailyService: DailyViewService) {
  }

  ngOnInit() {
    this._dailyService.getTasks().subscribe(e => this.tasks = e);
  }

  addNewTask(task: any) {
    this.tasks.unshift(task);
  }

  toggleTask(taskIndex: number) {
    this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
  }

}
