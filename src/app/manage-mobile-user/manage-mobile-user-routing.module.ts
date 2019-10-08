import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageMobileUserComponent} from './manage-mobile-user.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: ManageMobileUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageMobileUserRoutingModule {
}
