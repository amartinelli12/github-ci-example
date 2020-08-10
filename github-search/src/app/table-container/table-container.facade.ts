import { Injectable, Inject } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ApplicationState } from '../root-store/application-state.model';
import { getColumnNames$, getUsers$, getTotalHits$, getActiveSearchType$, getTotals$ } from './table-container-store/table-container.selectors';
import { getUsersRequest, setSearchType } from './table-container-store/table-container.actions';
import { UserViewModel } from './table-container-store/users-view.model';
import { DOCUMENT } from '@angular/common';
import { SearchType } from './type-cards/search-type.enum';
import { Totals } from './table-container-store/table-container.models';

/* I wouldn't normally stand up all of the NgRx infrastructure for something this small
but I felt like it made sense given the context of this exercise.
*/
@Injectable({
    providedIn: 'root'
})
export class TableContainerFacade {
    readonly users$: Observable<UserViewModel[]> = this.store.pipe(select(getUsers$));
    readonly columns$: Observable<string[]> = this.store.pipe(select(getColumnNames$));
    readonly totalCount$: Observable<number> = this.store.pipe(select(getTotalHits$));
    readonly activeSearchType$: Observable<SearchType> = this.store.pipe(select(getActiveSearchType$));
    readonly totals$: Observable<Totals> = this.store.pipe(select(getTotals$));
    readonly URLS_KEY: string = 'urls';
    readonly LOGIN_KEY: string = 'login';

    constructor(
        private store: Store<ApplicationState>,
        @Inject(DOCUMENT) readonly document: Document
    ) { }

    /** The Window object from Document defaultView */
    get window(): Window { return this.document.defaultView; }

    requestUsersFromGitlab(query: string) {
        console.count('Facade hit');
        this.store.dispatch(getUsersRequest({ query }));
    }

    // Navigating to an external url logic comes from https://medium.com/wizdm-genesys/angular-redirecting-to-external-links-bd3e785325c6
    navigateToGithub(url: string) {
        this.window.open(url);
    }

    isUrlsKey(key: string): boolean {
        return key === this.URLS_KEY;
    }

    isLoginKey(key: string): boolean {
        return key === this.LOGIN_KEY;
    }

    setSearchType(searchType: SearchType) {
        this.store.dispatch(setSearchType({ searchType }));
    }
}
