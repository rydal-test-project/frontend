import {AuthStore} from "./auth";
import {AppStore} from "./app-store";
import {BaseStore} from "./base";


class Stores extends BaseStore {
    app: AppStore
    auth!: AuthStore

    constructor() {
        super()
        this.auth = new AuthStore()
        this.app = new AppStore()
    }
}


const stores = new Stores()

export {
    stores,
    Stores
}