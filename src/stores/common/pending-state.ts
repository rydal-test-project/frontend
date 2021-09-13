import {action, computed, makeObservable} from "mobx";

enum PendingStateStoreState {
    PENDING = 'PENDING',
    NONE = 'NONE',
    FAILURE = 'FAILURE'
}
export class PendingStateStore {
    state: PendingStateStoreState = PendingStateStoreState.NONE

    constructor() {
        makeObservable(this)
    }

    @action
    setPending() {
        this.state = PendingStateStoreState.PENDING
    }

    @computed
    get isPending() {
        return this.state === PendingStateStoreState.PENDING
    }
}