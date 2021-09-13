import {makeObservable, observable} from "mobx";
import {UserModel} from "@models";
import {PendingStateStore} from "./common";

export class AuthStore {
    @observable
    user?: UserModel
    pendingState: PendingStateStore

    constructor() {
        makeObservable(this);
        this.pendingState = new PendingStateStore()
    }
}