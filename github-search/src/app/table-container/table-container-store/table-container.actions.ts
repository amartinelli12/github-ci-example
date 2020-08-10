import { createAction, props } from '@ngrx/store';
import { GetUsersResponse } from 'src/app/root-store/user-response.model';
import { User } from 'src/app/root-store/user.model';
import { SearchType } from '../type-cards/search-type.enum';

// Data load ajax trios
// Get users -- the default if you choose no types
export const getUsersRequest = createAction(
    '[Table Container] Get users request',
    props<{query: string}>()
);
export const getUsersSuccess = createAction(
    '[Table Container] Get users success',
    props<{ response: GetUsersResponse }>()
);
export const getUsersError = createAction('[Table Container] Get users error');

export const getRepositoriesRequest = createAction(
    '[Table Container] Get repositories request',
    props<{query: string}>()
);
export const getRepositoriesSuccess = createAction(
    '[Table Container] Get repositories success',
    props<{ repositoriesResponse: GetUsersResponse }>()
);

export const getCodeSuccess = createAction(
    '[Table Container] Get code success',
    props<{ codeResponse: GetUsersResponse }>()
);

export const getCommitsSuccess = createAction(
    '[Table Container] Get commits success',
    props<{ commitsResponse: GetUsersResponse }>()
);

export const getIssuesSuccess = createAction(
    '[Table Container] Get issues success',
    props<{ issuesResponse: GetUsersResponse }>()
);

export const getPackagesSuccess = createAction(
    '[Table Container] Get packages success',
    props<{ packagesResponse: GetUsersResponse }>()
);

export const getMarketplaceSuccess = createAction(
    '[Table Container] Get marketplace success',
    props<{ marketplaceResponse: GetUsersResponse }>()
);

export const getTopicsSuccess = createAction(
    '[Table Container] Get topics success',
    props<{ topicsResponse: GetUsersResponse }>()
);

export const getWikisSuccess = createAction(
    '[Table Container] Get wikis success',
    props<{ wikisResponse: GetUsersResponse }>()
);

// Get user details
export const getUserDetailsRequest = createAction(
    '[Table Container] Get user details request',
    props<{query: string}>()
);
export const getUserDetailsSuccess = createAction(
    '[Table Container] Get user details success',
    props<{ response: User }>()
);
export const getUserDetailsError = createAction('[Table Container] Get user details error');

export const setSearchType = createAction(
    '[Table Container] Set search type',
    props<{searchType: SearchType}>()
);
