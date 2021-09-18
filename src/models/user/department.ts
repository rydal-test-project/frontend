import {IAdaptedDepartment} from "@adapters";
import {BaseModel} from "../base";
import {observable} from "mobx";

export class DepartmentModel extends BaseModel {
    readonly id: number;
    @observable.struct
    name: string;

    constructor(payload: IAdaptedDepartment) {
        super();

        this.id = payload.id
        this.name = payload.name
    }
}