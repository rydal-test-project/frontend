import {FioModel} from "./fio";
import {DepartmentModel} from "./department";
import {GroupModel} from "./group";
import {BaseModel} from "../base";
import {IAdaptedUser} from "@adapters";
import {observable} from "mobx";

export class UserModel extends BaseModel {
    readonly id: number;
    @observable.struct
    fio: FioModel;
    @observable.struct
    group: GroupModel;
    @observable.struct
    department: DepartmentModel;
    @observable
    email: string;
    @observable
    phoneNumber: string;

    constructor(payload: IAdaptedUser) {
        super();

        this.email = payload.email
        this.phoneNumber = payload.phoneNumber
        this.id = payload.id
        this.fio = new FioModel(payload.fio)
        this.department = new DepartmentModel(payload.department)
        this.group = new GroupModel(payload.group)
    }
}