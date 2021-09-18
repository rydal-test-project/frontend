import {makeObservable, observable} from "mobx";

import {IAdaptedFio} from "@adapters";
import {BaseModel} from "../base";


export class FioModel extends BaseModel {
    @observable.struct
    name: string
    @observable.struct
    secondName: string
    @observable.struct
    lastName: string

    constructor(payload: IAdaptedFio) {
        super();
        makeObservable(this)

        this.name = payload.name
        this.secondName = payload.secondName
        this.lastName = payload.lastName
    }
}