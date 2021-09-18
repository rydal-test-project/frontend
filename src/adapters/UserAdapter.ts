import {IGetUserFetchResponseData} from "@requests";

export interface IAdaptedUser {
    id: number;
    phoneNumber: string;
    email: string;
    fio: IAdaptedFio;
    group: IAdaptedGroup;
    department: IAdaptedDepartment;
}
export interface IAdaptedGroup {

}
export interface IAdaptedFio {
    name: string
    secondName: string
    lastName: string
}
export interface IAdaptedDepartment {

}

export class UserAdapter {
    static adaptUser (payload: IGetUserFetchResponseData): IAdaptedUser {
        return {
            fio: this.adaptFio(payload),
            group: this.adaptGroup(),
            department: this.adaptDepartment(),
            id: 0,
            phoneNumber: '',
            email: '',
        }
    }

    static adaptGroup (): IAdaptedGroup {
        return {

        }
    }
    static adaptFio (payload: IGetUserFetchResponseData): IAdaptedFio {
        return {
            name: payload.name,
            lastName: payload.patronymic,
            secondName: payload.surname,
        }
    }
    static adaptDepartment (): IAdaptedDepartment {
        return {

        }
    }
}