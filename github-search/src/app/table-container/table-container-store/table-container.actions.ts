import { createAction, props } from '@ngrx/store';

// Data load ajax trio
export const getUsersRequest = createAction('[Table Container] Get users request', props<{query: string}>());
export const getUsersSuccess = createAction('[Table Container] Get users success');
export const getUsersError = createAction('[Table Container] Get users error');

// Table Rows
export const expandRow = createAction('[Table Container] Expand row', props<{rowId: string}>());
export const collapseRow = createAction('[Table Container] Collapse row', props<{rowId: string}>());

// Pagination
export const goToSpecificPage = createAction('[Table Container] Go to specific page', props<{pageNumber: number}>());
export const goToPreviousPage = createAction('[Table Container] Go to previous page');
export const goToNextPage = createAction('[Table Container] Go to next page');

// Search bar
export const searchForUser = createAction('[Table Container] Search for user', props<{login: string}>());
export const clearSearch = createAction('[Table Container] Clear search');
