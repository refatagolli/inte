import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxMaskModule} from 'ngx-mask';
import {options} from '../add-staff/add-staff.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    NgxMaskModule.forRoot(options)
  ]
})
export class StaffProfileModule { }
