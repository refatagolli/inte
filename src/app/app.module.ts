import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {DailyViewModule} from './daily-view/daily-view.module';
import {ThemeModule} from '@theme/theme.module';
import {theme_config} from './config/theme_config';
import {BaseLayoutModule} from './base-layout/base-layout.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ThemeModule.forRoot(theme_config),
    SharedModule,
    BaseLayoutModule,
    DailyViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
