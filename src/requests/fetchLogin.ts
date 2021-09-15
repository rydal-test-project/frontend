import {FetchFactory} from "../factories";
import api from "../common/api";
import {stores} from "@stores";


export interface ILoginFetchResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number
}
export interface ILoginFetchParams { email: string; password: string }

export const fetchLogin = new FetchFactory<ILoginFetchResponse, ILoginFetchParams>('login')
    .addDebugger()
    .addServerActions(stores.auth.serverActions.login)
    .make(payload => api.post('auth/login', payload)
)

