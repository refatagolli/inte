import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DailyViewComponent} from './daily-view.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: DailyViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyViewRoutingModule {
}
