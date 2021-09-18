import {api} from "@api";


export interface IGetUserFetchResponseData {
    id: number,
    phoneNumber: string,
    email: string,
    patronymic: string,
    surname: string,
    name: string,
}
export interface IGetUserFetchParams {}

export const fetchGetUser = (payload: IGetUserFetchParams) => api.get<IGetUserFetchResponseData, IGetUserFetchParams>({
    url: 'auth/user', ...payload
})

