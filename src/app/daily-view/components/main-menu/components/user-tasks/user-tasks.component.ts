import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {DailyViewService} from '../../../../../services/daily-view.service';

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

  constructor(
    // private _tasksService: TaskManagementService
    private _dailyService: DailyViewService
  ) {
  }

  ngOnInit() {
    this._getAllTasks();
    // this._tasksService.getAllStaff().subscribe(e => console.log(e));
  }

  addNewTask() {
    // if (this.input.nativeElement.value) {
    //   this._tasksService.create(this.input.nativeElement.value).subscribe(e => {
    //
    //     this._getAllTasks();
    //     this.input.nativeElement.value = '';
    //     this.addTask = false;
    //
    //   });
    // }

    const toAdd = {complete: false, taskname: this.input.nativeElement.value};
    this.tasks.toDo.unshift(toAdd);
    this.input.nativeElement.value = '';
    this.addTask = false;
  }

  toggleTask(taskIndex: number, completed: boolean) {
    const toToggle: { complete: boolean; taskname: string } = completed ? this.tasks.completed[taskIndex] : this.tasks.toDo[taskIndex];
    toToggle.complete = !toToggle.complete;
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

  private _getAllTasks() {
    this._dailyService.getTasks().pipe(
      tap(console.log),
      map(e => ({
        toDo: e.filter(a => !a.complete),
        completed: e.filter(a => a.complete)
      }))
    ).subscribe(e => this.tasks = e);
  }
}
