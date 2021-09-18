import {IAdaptedGroup} from "@adapters";
import {BaseModel} from "../base";
import {observable} from "mobx";

export class GroupModel extends BaseModel{
    readonly id: number;
    @observable.struct
    name: string;

    constructor(payload: IAdaptedGroup) {
        super();

        this.id = payload.id
        this.name = payload.name
    }
}