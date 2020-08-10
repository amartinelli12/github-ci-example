import { Action, createReducer, on } from '@ngrx/store';
import { TableContainerState, Totals } from './table-container.models';
import {
    getUsersSuccess,
    getUserDetailsSuccess,
    setSearchType,
    getUsersRequest,
    getRepositoriesSuccess,
    getCodeSuccess,
    getCommitsSuccess,
    getIssuesSuccess,
    getPackagesSuccess,
    getMarketplaceSuccess,
    getTopicsSuccess,
    getWikisSuccess
} from './table-container.actions';
import { User } from 'src/app/root-store/user.model';
import { UserViewModel, UserUrls } from './users-view.model';
import { SearchType } from '../type-cards/search-type.enum';

export const TABLE_CONTAINER_INITIAL_STATE: TableContainerState = {
    users: [],
    columnNames: [],
    usersResponse: null,
    activeSearchType: SearchType.USERS,
    totals: {
        Code: 0,
        Commits: 0,
        Issues: 0,
        Marketplace: 0,
        Packages: 0,
        Repositories: 0,
        Topics: 0,
        Users: 0,
        Wikis: 0
    },
    query: ''
};

// Matches anything that ends with url
const urlKeyRegex = /\w*url$/;
const idRegex = /\w*id$/;

const urlKeyFilter = ((key: string) => !idRegex.test(key) && !urlKeyRegex.test(key));

const mapUserToViewModelUser: (user: User) => UserViewModel = (user: User) => {
    // Used to generate a new object given a list of keys
    const objectReduction = (acc, key) => ({
        ...acc,
        [key]: user[key]
    });
    // All of the keys from the User object that do *NOT* contain url at the end
    const keys: string[] = Object.keys(user).filter(urlKeyFilter);
    // All of the keys from the user object that *DO* contain url at the end
    const urlKeys: string[] = Object.keys(user).filter((key) => urlKeyRegex.test(key));
    // Build a UserUrls object to be used by the userViewModel reduction
    const urlsObject: UserUrls = urlKeys.reduce(objectReduction, {});
    // Buidl a UserViewModel object
    const userViewModel: UserViewModel = keys.reduce(objectReduction, { urls: urlsObject });
    return userViewModel;
};



// Reducer for all of the table container state.
const reducer = createReducer(
    TABLE_CONTAINER_INITIAL_STATE,
    // TODO: on statements
    on(getUsersRequest, (state: TableContainerState, { query }) => {
        return ({
        ...state,
        query
    }); }),
    on(getUsersSuccess, (state: TableContainerState, { response }) => {
        console.count('Get Users Success');
        const returnValue = {
            ...state,
            users: response.items.map(mapUserToViewModelUser),
            usersResponse: response,
            totals: {
                ...state.totals,
                Users: response.total_count
            }
        };
        console.log('State: ', returnValue);
        return ({
        ...state,
        users: response.items.map(mapUserToViewModelUser),
        usersResponse: response,
        totals: {
            ...state.totals,
            Users: response.total_count
        }
    }); }),
    on(getUserDetailsSuccess, (state: TableContainerState, { response }) => ({
        ...state,
        users: state.users.map((user) => {
            if (user.login === response.login) {
                return {
                    ...user,
                    ...response
                };
            } else {
                return user;
            }
        })
    })),
    on(setSearchType, (state: TableContainerState, { searchType }) => {
        return ({
        ...state,
        activeSearchType: searchType
    }); }),
    on(getRepositoriesSuccess,
        (state: TableContainerState, { repositoriesResponse }) => {
            console.count('Get Repos Success');
            const returnValue = {
                ...state,
                totals: {
                    ...state.totals,
                    Repositories: repositoriesResponse.total_count
                }
            };
            console.log(returnValue);
            return ({
            ...state,
            totals: {
                ...state.totals,
                Repositories: repositoriesResponse.total_count
            }
        }); }
    ),
    on(getCodeSuccess,
        (state: TableContainerState, { codeResponse }) => ({
            ...state,
            totals: {
                ...state.totals,
                Code: codeResponse.total_count
            }
        })
    ),
    on(getMarketplaceSuccess,
        (state: TableContainerState, { marketplaceResponse }) => ({
            ...state,
            totals: {
                ...state.totals,
                Marketplace: marketplaceResponse.total_count
            }
        })
    ),
    on(getCommitsSuccess,
        (state: TableContainerState, { commitsResponse }) => ({
            ...state,
            totals: {
                ...state.totals,
                Commits: commitsResponse.total_count
            }
        })
    ),
    on(getIssuesSuccess,
        (state: TableContainerState, { issuesResponse }) => ({
            ...state,
            totals: {
                ...state.totals,
                Issues: issuesResponse.total_count
            }
        })
    ),
    on(getPackagesSuccess,
        (state: TableContainerState, { packagesResponse }) => ({
            ...state,
            totals: {
                ...state.totals,
                Packages: packagesResponse.total_count
            }
        })
    ),
    on(getTopicsSuccess,
        (state: TableContainerState, { topicsResponse }) => ({
            ...state,
            totals: {
                ...state.totals,
                Topics: topicsResponse.total_count
            }
        })
    ),
    on(getWikisSuccess,
        (state: TableContainerState, { wikisResponse }) => ({
            ...state,
            totals: {
                ...state.totals,
                Wikis: wikisResponse.total_count
            }
        })
    ),
);

// Export a function here so AOT can correctly compile this function.
export function tableContainerReducer(state: TableContainerState = TABLE_CONTAINER_INITIAL_STATE, action: Action) {
    return reducer(state, action);
}
