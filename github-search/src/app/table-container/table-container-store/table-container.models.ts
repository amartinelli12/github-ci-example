import { GetUsersResponse } from 'src/app/root-store/user-response.model';
import { User } from 'src/app/root-store/user.model';
import { UserViewModel } from './users-view.model';
import { SearchType } from '../type-cards/search-type.enum';

export interface Totals {
    [SearchType.CODE]: number;
    [SearchType.COMMITS]: number;
    [SearchType.ISSUES]: number;
    [SearchType.MARKETPLACE]: number;
    [SearchType.PACKAGES]: number;
    [SearchType.REPOSITORIES]: number;
    [SearchType.TOPICS]: number;
    [SearchType.USERS]: number;
    [SearchType.WIKIS]: number;
}

export interface TableContainerState {
    readonly users: UserViewModel[];
    readonly columnNames: string[];
    readonly usersResponse: GetUsersResponse;
    readonly activeSearchType: SearchType;
    readonly totals: Totals;
    readonly query: string;
}
