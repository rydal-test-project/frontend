import {api} from "@api";


export interface ILoginFetchResponseData {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number
}
export interface ILoginFetchData { email: string; password: string }

export const fetchLogin = (data: ILoginFetchData) => api.post<ILoginFetchResponseData, ILoginFetchData>({
    url: 'auth/login',
    data
})

