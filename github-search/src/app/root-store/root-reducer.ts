import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import { ApplicationState } from './application-state.model';
import { tableContainerReducer } from '../table-container/table-container-store/table-container.reducer';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<ApplicationState>>('root reducer');

export const reducers: ActionReducerMap<ApplicationState> = {
    tableContainer: tableContainerReducer
};
