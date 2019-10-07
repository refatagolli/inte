import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../shared/material.module';
import {ManageMobileUserComponent} from './manage-mobile-user.component';
import {ManageMobileUserRoutingModule} from './manage-mobile-user-routing.module';
import {MatSnackBarModule} from '@angular/material';

@NgModule({
  declarations: [
    ManageMobileUserComponent
  ],
  exports: [
    ManageMobileUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    MatSnackBarModule,
    ManageMobileUserRoutingModule
  ]
})
export class ManageMobileUserModule { }
