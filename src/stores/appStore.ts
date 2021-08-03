import {action, computed, observable, makeObservable} from "mobx";
import {dictionary} from "../common/types";
import {appStoreLogger} from "../debug";


export default class AppStore {
  @observable _pendingState = {} as dictionary<boolean>;

  constructor() {
    makeObservable(this);
  }

  @action
  setPending (key: string): void {
    appStoreLogger('set pending %s', key);
    this._pendingState = { ...this._pendingState, [key]: true }
  }
  @action
  unSetPending (key: string): void {
    appStoreLogger('unset pending %s', key);
    this._pendingState = { ...this._pendingState, [key]: false }
  }

  @computed
  get isPending (): (key: string) => boolean {
    return (key: string) => this._pendingState[key];
  }
}
