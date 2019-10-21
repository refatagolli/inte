import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivateStaffAccountComponent} from './activate-staff-account.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: ActivateStaffAccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivateStaffAccountRoutingModule {
}
