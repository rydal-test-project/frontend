import {observable, action, makeObservable} from 'mobx'
import UserModel from "../models/user";


export class User {
  @observable user: UserModel = {} as UserModel;
  @observable isLogged = false;
  @observable inLoggingState = false;

  constructor() {
    makeObservable(this);
  }

  @action
  setUser(user: UserModel) {
    this.user = user
  }
  @action
  setIsLogged(bool: boolean) {
    this.isLogged = bool
  }
  @action
  setInLoggingState(bool: boolean) {
    this.inLoggingState = bool
  }
}

export const userStore = new User();