import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DailyViewService} from '../../../../../services/daily-view.service';
import {map} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss'],
})
export class UserTasksComponent implements OnInit {
  tasks = {
    toDo: [],
    completed: []
  };

  expanded = true;
  addTask = false;
  @ViewChild('newTask') input: ElementRef;

  constructor(private _dailyService: DailyViewService) {
  }

  ngOnInit() {
    this._dailyService.getTasks().pipe(
      map(e => ({
        toDo: e.filter(a => !a.completed),
        completed: e.filter(a => a.completed)
      }))
    ).subscribe(e => this.tasks = e);
  }

  addNewTask() {
    console.log(this.input.nativeElement.value);
    if (this.input.nativeElement.value) {
      this.tasks.toDo.unshift({value: this.input.nativeElement.value, selected: false});
      this.input.nativeElement.value = '';
      this.addTask = false;
    }
  }

  toggleTask(taskIndex: number, completed: boolean) {
    const toToggle: {completed: boolean; value: string} = completed ? this.tasks.completed[taskIndex] : this.tasks.toDo[taskIndex];
    toToggle.completed = !toToggle.completed;
    console.log(toToggle)
    if (completed) {
      this.tasks.completed.splice(taskIndex, 1);
      this.tasks.toDo.push(toToggle);
    } else {
      this.tasks.toDo.splice(taskIndex, 1);
      this.tasks.completed.push(toToggle);
    }
  }

  removeTask(index: number) {
    this.tasks.toDo.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks.toDo, event.previousIndex, event.currentIndex);
  }
}
