import {FioModel} from "./fio";
import {DepartmentModel} from "./department";
import {GroupModel} from "./group";
import {BaseModel} from "../base";
import {IAdaptedUser} from "@adapters";
import {observable} from "mobx";

export class UserModel extends BaseModel {
    readonly id: number;
    @observable.ref
    fio: FioModel;
    @observable.ref
    group: GroupModel;
    @observable.ref
    department: DepartmentModel;
    @observable.struct
    email: string;
    @observable.struct
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