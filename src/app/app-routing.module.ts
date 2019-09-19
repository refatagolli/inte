import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'daily'},
  {path: 'daily', loadChildren: './daily-view/daily-view.module#DailyViewModule'},
  {path: 'home', loadChildren: './staff-management/staff-management.module#StaffManagementModule'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
