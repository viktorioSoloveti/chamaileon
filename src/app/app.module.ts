import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SDKComponent } from './components/chamalion.component';
import { SdkDirective } from './SDK.directive';
import { AccessToken } from './state/access.token';

@NgModule({
  declarations: [AppComponent, SdkDirective, SDKComponent],
  imports: [BrowserModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
