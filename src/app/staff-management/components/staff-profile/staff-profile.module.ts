import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {StaffDeleteConfirmationModule} from '../staff-delete-confirmation/staff-delete-confirmation.module';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    NgxMaskModule.forRoot(options),
    StaffDeleteConfirmationModule,
    MatSnackBarModule,
  ]
})
export class StaffProfileModule { }
