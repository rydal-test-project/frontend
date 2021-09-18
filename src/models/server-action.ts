import {action, computed, makeObservable, observable} from "mobx";
import {ServerActionState} from "@constants";


export class ServerActionModel {
    @observable
    state: ServerActionState = ServerActionState.NONE

    constructor(defaultState = ServerActionState.NONE) {
        this.state = defaultState

        makeObservable(this)
    }

    @action
    setPending() {
        this.state = ServerActionState.IN_PENDING
    }
    @action
    setFinished() {
        this.state = ServerActionState.FINISHED
    }

    @computed
    get isPending() {
        return this.state === ServerActionState.IN_PENDING
    }
    @computed
    get isFinished() {
        return this.state === ServerActionState.FINISHED
    }
    @computed
    get isUnknown() {
        return this.state === ServerActionState.NONE
    }
}