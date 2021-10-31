import {AuthStore} from "./auth";
import {BaseStore} from "./base";
import {UiStore} from "./ui";


class Stores extends BaseStore {
    auth: AuthStore
    ui: UiStore

    constructor() {
        super();

        this.auth = new AuthStore();
        this.ui = new UiStore();
    }
}


const stores = new Stores()

export {
    stores,
    Stores
}