import {action, computed, makeObservable, observable} from "mobx";
import {ServerActionState} from "@constants";
import {AxiosError} from "axios";


export class ServerActionModel {
    @observable
    state: ServerActionState = ServerActionState.NONE

    constructor() {
        makeObservable(this)
    }

    @action
    setPending() {
        this.state = ServerActionState.PENDING
    }
    @action
    setSuccess() {
        this.state = ServerActionState.SUCCESS
    }
    @action
    setFailure(e: AxiosError) {
        this.state = ServerActionState.FAILURE
    }

    @computed
    get isPending() {
        return this.state === ServerActionState.PENDING
    }
    @computed
    get isSuccess() {
        return this.state === ServerActionState.SUCCESS
    }
    @computed
    get isFailure() {
        return this.state === ServerActionState.FAILURE
    }
    @computed
    get isUnknown() {
        return this.state === ServerActionState.NONE
    }
}