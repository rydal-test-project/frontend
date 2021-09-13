import { inject } from 'react-ioc'
import {AuthStore} from "./auth";
import {AppStore} from "./app-store";

export class Stores {
    @inject(AppStore) app!: AppStore
    @inject(AuthStore) user!: AuthStore
}
