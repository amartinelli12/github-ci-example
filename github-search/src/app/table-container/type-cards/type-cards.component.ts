import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

import { SearchType } from './search-type.enum';
import { Totals } from '../table-container-store/table-container.models';

@Component({
    selector: 'app-type-cards',
    templateUrl: './type-cards.component.html',
      styleUrls: ['./type-cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeCardsComponent {
    @Input() activeSearchType: SearchType;
    @Input() totals: Totals;
    @Output() selectType: EventEmitter<SearchType> = new EventEmitter<SearchType>();
    readonly types = SearchType;
    readonly defaultClasses: string = 'mat-card mat-focus-indicator menu-item';
    readonly selectedClass: string = `${this.defaultClasses} selected`;
    constructor() { }

    setSearchType(searchType: SearchType) {
        this.selectType.emit(searchType);
    }

    setClass(searchType: SearchType) {
        return searchType === this.activeSearchType ? this.selectedClass : this.defaultClasses;
    }
}
