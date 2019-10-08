import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MobileForgotPasswordComponent} from './mobile-forgot-password.component';
import {RecoverComponent} from './recover/recover.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: MobileForgotPasswordComponent},
  {path: 'recover', pathMatch: 'full', component: RecoverComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileForgotPasswordRoutingModule {
}
