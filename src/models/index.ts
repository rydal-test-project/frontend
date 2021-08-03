import user from "./user";
import {onSnapshot} from "mobx-state-tree";
import {userModelLogger} from "../debug";

export default class ModelsData {
    user = user.create({
    });

    constructor() {
        onSnapshot(this.user, snapshot => userModelLogger('changed state %O', snapshot))
    }
}
