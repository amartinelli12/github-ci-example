import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of, forkJoin } from 'rxjs';
import { switchMap, map, catchError, concatMap, mergeMap, withLatestFrom } from 'rxjs/operators';

import {
    getUsersRequest,
    getUsersSuccess,
    getUsersError,
    getUserDetailsError,
    getUserDetailsRequest,
    getUserDetailsSuccess,
    getCodeSuccess,
    getIssuesSuccess,
    getMarketplaceSuccess,
    getPackagesSuccess,
    getRepositoriesSuccess,
    getTopicsSuccess,
    getCommitsSuccess,
    getWikisSuccess
} from './table-container.actions';
import { GetUsersResponse } from '../../root-store/user-response.model';
import { User } from 'src/app/root-store/user.model';
import { getActiveSearchType$, getCurrentQuery$ } from './table-container.selectors';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/root-store/application-state.model';
import { SearchType } from '../type-cards/search-type.enum';

const REQUEST_URL = 'https://api.github.com/search/users?q=';

@Injectable({
    providedIn: 'root',
})
export class TableContainerEffects {
    apiCallDictionary = {
        [SearchType.CODE]: (query) => this.buildUrls(query, SearchType.CODE),
        [SearchType.ISSUES]: (query) => this.buildUrls(query, SearchType.ISSUES),
        [SearchType.MARKETPLACE]: (query) => this.buildUrls(query, SearchType.MARKETPLACE),
        [SearchType.PACKAGES]: (query) => this.buildUrls(query, SearchType.PACKAGES),
        [SearchType.REPOSITORIES]: (query) => this.buildUrls(query, SearchType.REPOSITORIES),
        [SearchType.TOPICS]: (query) => this.buildUrls(query, SearchType.TOPICS),
        [SearchType.COMMITS]: (query) => this.buildUrls(query, SearchType.COMMITS),
        [SearchType.WIKIS]: (query) => this.buildUrls(query, SearchType.WIKIS),
    };

    searchTypes: string[] = [
        SearchType.CODE,
        SearchType.ISSUES,
        SearchType.MARKETPLACE,
        SearchType.PACKAGES,
        SearchType.REPOSITORIES,
        SearchType.TOPICS,
        SearchType.COMMITS,
        SearchType.WIKIS
    ];

    // Doesn't include users as this is the default.
    actionDictionary = {
        [SearchType.CODE]: ( codeResponse) => getCodeSuccess({ codeResponse }),
        [SearchType.ISSUES]: ( issuesResponse) => getIssuesSuccess({ issuesResponse }),
        [SearchType.MARKETPLACE]: ( marketplaceResponse) => getMarketplaceSuccess({ marketplaceResponse }),
        [SearchType.PACKAGES]: ( packagesResponse) => getPackagesSuccess({ packagesResponse }),
        [SearchType.REPOSITORIES]: ( repositoriesResponse) => getRepositoriesSuccess({ repositoriesResponse }),
        [SearchType.TOPICS]: ( topicsResponse) => getTopicsSuccess({ topicsResponse }),
        [SearchType.COMMITS]: ( commitsResponse) => getCommitsSuccess({ commitsResponse }),
        [SearchType.WIKIS]: ( wikisResponse) => getWikisSuccess({ wikisResponse }),
    };

    getUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUsersRequest),
            withLatestFrom(this.store.pipe(select(getActiveSearchType$))),
            switchMap(
                ([usersRequest, searchType]) => this.buildUrls(usersRequest.query, searchType)
                .pipe(
                    concatMap((response) => [
                        ...response.items.map((item) => getUserDetailsRequest({query: item.url})),
                        getUsersSuccess({response})
                    ]),
                    catchError((err) => of(getUsersError()))
                )
            )
        )
    );

    // Interesting note: I *think* I found a defect within NgRx. ofType was allowing all of the success actions through,
    // seemed to be related to having the same key name in the action *response* and it had the same type.
    // That's what I get for trying to hurry! This effect was creating
    // an infinite loop till I changed the names of the keys.
    // I also tested changing the type of the key and that worked as well. When I have a little more time,
    // I will go see if there is an issue for this already.
    getCount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUsersSuccess),
            withLatestFrom(
                this.store.pipe(select(getCurrentQuery$))
            ),
            // tslint:disable-next-line
            map(([action,  query]) => query ),
            mergeMap((value) => forkJoin(this.searchTypes.map((searchType) => this.apiCallDictionary[searchType](value)))
            .pipe(
                concatMap(
                    (results, index) => this.searchTypes.map(
                        (searchType) => this.actionDictionary[searchType](results[index])
                    )
                )
            ))
        )
    );

    getUserDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUserDetailsRequest),
            mergeMap(
                (userDetailsRequest) => this.httpClient.get<User>(userDetailsRequest.query).pipe(
                    map((response) => getUserDetailsSuccess({ response })),
                    catchError(err => of(getUserDetailsError))
                )
            )
        )
    );
    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<ApplicationState>
    ) { }

    buildUrls(query: string, searchType: SearchType) {
        return this.httpClient.get<GetUsersResponse>(`${REQUEST_URL}${query}&type=${searchType}`);
    }
}
