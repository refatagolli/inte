import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {MatSnackBarModule} from '@angular/material/snack-bar';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    NgxMaskModule.forRoot(options),
    MatSnackBarModule,
  ]
})
export class StaffProfileModule { }
