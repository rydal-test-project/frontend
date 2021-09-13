import {FetchFactory} from "../factories";
import api from "../common/api";


export interface ILoginFetchResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number
}
export interface ILoginFetchParams { email: string; password: string }

export const fetchLogin = new FetchFactory<ILoginFetchResponse, ILoginFetchParams>('login').addLogger().make(payload =>
    api.get('auth/login', {
        data: payload
    })
)

