import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'table-row',
  templateUrl: './table-row.component.html',
//   styleUrls: ['./table-container.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent {
  constructor() {}
}