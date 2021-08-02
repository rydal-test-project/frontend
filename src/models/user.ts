import { types } from 'mobx-state-tree'
import { userModelLogger } from "../debug";

const UserModel = types.model('User', {

})

UserModel.postProcessSnapshot(snapshot => userModelLogger.log('changed state %o', snapshot))

export default UserModel
