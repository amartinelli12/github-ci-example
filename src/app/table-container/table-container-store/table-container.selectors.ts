import { createFeatureSelector, MemoizedSelector, createSelector, DefaultProjectorFn } from '@ngrx/store';
import { ApplicationState } from '../../root-store/application-state.model';
import { TableContainerState, Totals } from './table-container.models';
import { GetUsersResponse } from 'src/app/root-store/user-response.model';
import { SearchType } from '../type-cards/search-type.enum';

const FEATURE_KEY_NAME = 'tableContainer';

export const getTableContainerState$: MemoizedSelector<ApplicationState, TableContainerState> = createFeatureSelector(FEATURE_KEY_NAME);

export const getCurrentQuery$ = createSelector(getTableContainerState$, (state: TableContainerState) => state.query ?? '');

export const getColumnNames$ = createSelector(getTableContainerState$, (state: TableContainerState) => state.columnNames ?? []);
export const getUsers$ = createSelector(getTableContainerState$, (state: TableContainerState) => state.users ?? []);
export const getUsersResponse$ = createSelector(getTableContainerState$, (state: TableContainerState) => state.usersResponse ?? null);

export const getTotalHits$ = createSelector(getUsersResponse$, (state: GetUsersResponse) => state?.total_count ?? null);
export const getActiveSearchType$ = createSelector(
    getTableContainerState$,
    (state: TableContainerState) => state?.activeSearchType ?? SearchType.USERS
);
export const getTotals$: MemoizedSelector<ApplicationState, Totals, DefaultProjectorFn<Totals>> = createSelector(
    getTableContainerState$,
    (state: TableContainerState) => state.totals ?? null
);
