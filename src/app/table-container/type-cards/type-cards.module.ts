// Angular Imports
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';

// Custom imports
import { TypeCardsComponent } from './type-cards.component';

@NgModule({
  declarations: [
    TypeCardsComponent
  ],
  imports: [
    MatCardModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [],
  exports: [TypeCardsComponent]
})
export class TypeCardsModule { }
