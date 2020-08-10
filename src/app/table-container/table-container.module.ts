import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';

import { SearchBarModule } from './search-bar/search-bar.module';
import { TypeCardsModule } from './type-cards/type-cards.module';
import { TableContainerComponent } from './table-container.component';
import { TableRowModule } from './table-row/table-row.module';
import { TableContainerEffects } from './table-container-store/table-container.effects';
import { TableContainerFacade } from './table-container.facade';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    TableContainerComponent
  ],
  imports: [
    TableRowModule,
    SearchBarModule,
    MatTableModule,
    MatPaginatorModule,
    EffectsModule.forFeature([TableContainerEffects]),
    CommonModule,
    MatExpansionModule,
    TypeCardsModule,
    MatSortModule
  ],
  providers: [TableContainerEffects, TableContainerFacade],
  exports: [TableContainerComponent],
})
export class TableContainerModule { }
