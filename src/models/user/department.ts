import {IAdaptedDepartment} from "@adapters";
import {BaseModel} from "../base";

export class DepartmentModel extends BaseModel{
    constructor(payload: IAdaptedDepartment) {
        super();
    }
}