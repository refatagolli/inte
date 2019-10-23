import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './services/guards/auth.guard';
import {ActivateGuard} from './services/guards/activate.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'daily'},
  {path: 'daily', loadChildren: './daily-view/daily-view.module#DailyViewModule'},
  {path: 'home', loadChildren: './staff-management/staff-management.module#StaffManagementModule'},
  {
    path: 'online',
    loadChildren: './online-staff-view/online-staff-view.module#OnlineStaffViewModule'
    // canActivate: [AuthGuard, ActivateGuard]
  },
  {path: 'register', loadChildren: './manage-mobile-user/manage-mobile-user.module#ManageMobileUserModule'},
  {
    path: 'activate',
    loadChildren: './activate-staff-account/activate-staff-account.module#ActivateStaffAccountModule'
    // canActivate: [AuthGuard]
  },
  {path: 'login', loadChildren: './mobile-login/mobile-login.module#MobileLoginModule'},
  {
    path: 'reset',
    loadChildren: './mobile-forgot-password/mobile-forgot-password.module#MobileForgotPasswordModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
