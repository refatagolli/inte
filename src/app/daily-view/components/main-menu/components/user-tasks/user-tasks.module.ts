import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTasksComponent } from './user-tasks.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MaterialModule} from '../../../../../shared/material.module';

@NgModule({
  declarations: [UserTasksComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  exports: [
    UserTasksComponent
  ]
})
export class UserTasksModule { }
