import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OnlineStaffViewComponent} from './online-staff-view.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: OnlineStaffViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineStaffViewRoutingModule {
}
