import { inject } from 'react-ioc'
import { AppStore } from "./app";

export default class Stores {
    @inject(AppStore) app!: AppStore
}
