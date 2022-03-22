import { SDK } from './index.d';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SDKComponent } from './components/chamalion.component';
import { SdkDirective } from './SDK.directive';
import { API } from './tokens';

@NgModule({
  declarations: [AppComponent, SdkDirective, SDKComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
