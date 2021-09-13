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

}
export interface IAdaptedDepartment {

}

export class UserAdapter {
    static adaptUser (): IAdaptedUser {
        return {
            fio: this.adaptFio(),
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
    static adaptFio (): IAdaptedFio {
        return {

        }
    }
    static adaptDepartment (): IAdaptedDepartment {
        return {

        }
    }
}