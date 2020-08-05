import { User } from './user.model';

export interface GetUsersResponse {
    readonly total_count: number;
    readonly incomplete_results: boolean;
    readonly items: User[];
}
