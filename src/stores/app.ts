import {computed, observable} from "mobx";
import {dictionary} from "../common/types";


export class AppStore {
  @observable _pendingState = {} as dictionary<boolean>

  setPending (key: string): void {
    this._pendingState = { ...this._pendingState, [key]: true }
  }
  unSetPending (key: string): void {
    this._pendingState = { ...this._pendingState, [key]: false }
  }

  @computed
  get isPending (): (key: string) => boolean {
    return (key: string) => this._pendingState[key];
  }
}
