import {api} from "@api";


export interface IGetUserFetchResponseData {
    id: number,
    phone_number: string,
    email: string,
    patronymic: string,
    surname: string,
    name: string,
    department: {
        created_at: string;
        id: number;
        name: string;
        updated_at: string;
    }

}
export interface IGetUserFetchParams {}

export const fetchGetUser = (payload: IGetUserFetchParams) => api.get<IGetUserFetchResponseData, IGetUserFetchParams>({
    url: 'auth/user', ...payload
})

