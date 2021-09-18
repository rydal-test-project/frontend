import api from "../../common/api";


export interface IGetUserFetchResponseData {
    data: {
        id: number,
        phoneNumber: string,
        email: string,
        patronymic: string,
        surname: string,
        name: string,
    }
}
export interface IGetUserFetchParams {}

export const fetchGetUser = (payload: IGetUserFetchParams) => api.get<IGetUserFetchResponseData>('auth/user', payload)

