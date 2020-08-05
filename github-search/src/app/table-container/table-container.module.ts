import { NgModule } from '@angular/core';

import { TableContainerComponent } from './table-container.component';
import { TableRowModule } from './table-row/table-row.module';
import { TableContainerEffects } from './table-container-store/table-container.effects';

@NgModule({
  declarations: [
    TableContainerComponent
  ],
  imports: [
    TableRowModule,
    TableContainerEffects
  ],
  providers: [],
  bootstrap: [TableContainerComponent]
})
export class TableContainerModule { }
