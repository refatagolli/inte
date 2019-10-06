import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'daily'},
  {path: 'daily', loadChildren: './daily-view/daily-view.module#DailyViewModule'},
  {path: 'home', loadChildren: './staff-management/staff-management.module#StaffManagementModule'},
  {path: 'register', loadChildren: './manage-mobile-user/manage-mobile-user.module#ManageMobileUserModule'},
  {path: 'login', loadChildren: './mobile-login/mobile-login.module#MobileLoginModule'},
  {path: 'forgotPass', loadChildren: './mobile-forgot-password/mobile-forgot-password.module#MobileForgotPasswordModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
