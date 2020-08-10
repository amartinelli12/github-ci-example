import { User } from './user.model';

export enum ApiResponseStatus {
    REQUESTED,
    SUCCESS,
    FAILURE,
    NOT_ACTIVE
}

export interface GetUsersResponse {
    readonly total_count: number;
    readonly incomplete_results: boolean;
    readonly items: User[];
}
