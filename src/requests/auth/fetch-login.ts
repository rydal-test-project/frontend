import api from "../../common/api";


export interface ILoginFetchResponseData {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number
}
export interface ILoginFetchParams { email: string; password: string }

export const fetchLogin = (payload: ILoginFetchParams) => api.post<ILoginFetchResponseData>('auth/login', payload)

