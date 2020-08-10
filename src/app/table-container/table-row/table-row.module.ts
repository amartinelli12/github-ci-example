import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TableRowComponent } from './table-row.component';

@NgModule({
  declarations: [
    TableRowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [TableRowComponent]
})
export class TableRowModule { }
