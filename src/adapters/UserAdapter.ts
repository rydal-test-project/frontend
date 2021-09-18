import {IGetUserFetchResponseData} from "@requests";
import {BaseAdapter} from "./Base";

export interface IAdaptedUser {
    id: number;
    phoneNumber: string;
    email: string;
    fio: IAdaptedFio;
    group: IAdaptedGroup;
    department: IAdaptedDepartment;
}
export interface IAdaptedGroup {
    id: number;
    name: string;
    updatedAt: string;
    createdAt: string;
}
export interface IAdaptedFio {
    name: string
    secondName: string
    lastName: string
}
export interface IAdaptedDepartment {
    id: number;
    name: string;
    updatedAt: string;
    createdAt: string;
}

export class UserAdapter extends BaseAdapter {
    static adaptUser (payload: IGetUserFetchResponseData): IAdaptedUser {
        return {
            fio: this.adaptFio(payload),
            group: this.adaptGroup(payload),
            department: this.adaptDepartment(payload),
            id: payload.id,
            phoneNumber: payload.phone_number,
            email: payload.email
        }
    }

    static adaptGroup (payload: IGetUserFetchResponseData): IAdaptedGroup {
        return {
            id: payload.department.id,
            name: payload.department.name,
            ...this.adaptModelDates(payload)
        }
    }
    static adaptFio (payload: IGetUserFetchResponseData): IAdaptedFio {
        return {
            name: payload.name,
            lastName: payload.patronymic,
            secondName: payload.surname,
        }
    }
    static adaptDepartment (payload: IGetUserFetchResponseData): IAdaptedDepartment {
        return {
            id: payload.department.id,
            name: payload.department.name,
            ...this.adaptModelDates(payload)
        }
    }
}