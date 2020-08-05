import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableContainerModule } from './table-container/table-container.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TableContainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
