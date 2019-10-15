import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {AddStaffComponent} from './add-staff.component';
import {SelectableButtonGroupModule} from '../../../shared/componets/selectable-button-group/selectable-button-group.module';
import {CustomOptionSetModule} from '../../../shared/componets/custom-option-set/custom-option-set.module';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {ConfirmationDialogModule} from '../confirmation-dialog/confirmation-dialog.module';
import {MatSnackBarModule} from '@angular/material';
export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AddStaffComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    SelectableButtonGroupModule,
    CustomOptionSetModule,
    NgxMaskModule.forRoot(options),
    MatSnackBarModule,
    ConfirmationDialogModule
  ],
  exports: [
    AddStaffComponent
  ],
})
export class AddStaffModule { }
