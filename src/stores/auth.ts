import {makeObservable, observable} from "mobx";
import {ServerActionModel, UserModel} from "@models";
import {BaseStore} from "./base";


export class AuthStore extends BaseStore {
    @observable.ref
    user?: UserModel

    @observable.ref
    serverActions: {
        login: ServerActionModel,
        getUser: ServerActionModel
    }

    constructor() {
        super();
        makeObservable(this);
        this.serverActions = {
            login: new ServerActionModel(),
            getUser: new ServerActionModel(),
        }
    }
}