import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MobileForgotPasswordComponent} from './mobile-forgot-password.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: MobileForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileForgotPasswordRoutingModule {
}
