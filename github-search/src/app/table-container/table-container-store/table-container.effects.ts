import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { getUsersRequest, getUsersSuccess, getUsersError } from './table-container.actions';
import { GetUsersResponse } from '../../root-store/user-response.model';

@Injectable({
    providedIn: 'root',
})
export class TableContainerEffects {
    readonly REQUEST_URL = 'https://api.github.com/search/users?q=';

    getUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUsersRequest),
            switchMap(
                (usersRequest) => this.httpClient.get<GetUsersResponse>(`${this.REQUEST_URL}${usersRequest.query}`).pipe(
                    map((response) => getUsersSuccess()),
                    catchError((err) => of(getUsersError()))
                )
            )
        )
    );
    constructor(
        private actions$: Actions,
        private httpClient: HttpClient
    ) { }
}
