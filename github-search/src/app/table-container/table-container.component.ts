import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
//   styleUrls: ['./table-container.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContainerComponent {
  constructor() {}
}
