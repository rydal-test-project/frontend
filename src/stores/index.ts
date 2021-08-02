import { inject } from 'react-ioc'
import AppStore from "./appStore";

export default class Stores {
    @inject(AppStore) app!: AppStore
}
