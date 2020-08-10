import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  searchGitlab(query: string) {
    this.search.emit(query);
  }

}
