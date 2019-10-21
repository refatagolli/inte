import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'daily'},
  {path: 'daily', loadChildren: './daily-view/daily-view.module#DailyViewModule'},
  {path: 'home', loadChildren: './staff-management/staff-management.module#StaffManagementModule'},
  {path: 'online', loadChildren: './online-staff-view/online-staff-view.module#OnlineStaffViewModule'},
  {path: 'home', loadChildren: './staff-management/staff-management.module#StaffManagementModule'},
  {path: 'register', loadChildren: './manage-mobile-user/manage-mobile-user.module#ManageMobileUserModule'},
  {path: 'activate', loadChildren: './activate-staff-account/activate-staff-account.module#ActivateStaffAccountModule'},
  {path: 'login', loadChildren: './mobile-login/mobile-login.module#MobileLoginModule'},
  {path: 'reset', loadChildren: './mobile-forgot-password/mobile-forgot-password.module#MobileForgotPasswordModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
