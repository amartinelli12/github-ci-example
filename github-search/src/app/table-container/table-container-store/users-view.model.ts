import { UserEnum } from '../../root-store/user.model';

export interface UserUrls {
    readonly avatar_url: string;
    readonly html_url: string;
    readonly followers_url: string;
    readonly following_url: string;
    readonly gists_url: string;
    readonly starred_url: string;
    readonly subscriptions_url: string;
    readonly organizations_url: string;
    readonly repos_url: string;
    readonly events_url: string;
    readonly received_events_url: string;
    readonly url: string;
}

export interface UserViewModel {
    readonly login: string;
    readonly id: number;
    readonly node_id: string;
    readonly gravatar_id: string;
    readonly type: UserEnum;
    readonly site_admin: boolean;
    readonly score: number;
    readonly urls: UserUrls;
    readonly location?: string;
    readonly name?: string;
}