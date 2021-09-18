import {inject} from "react-ioc";

import {Base} from "./base";
import {fetchGetUser, fetchLogin} from "@requests";
import {AuthStore, stores} from "@stores";
import {UserModel} from "@models";
import {UserAdapter} from "@adapters";
import {serviceFetch} from "@utils";


export class AuthService extends Base {
  @inject(AuthStore) authStore!: AuthStore;

  @serviceFetch({
    serverAction: stores.auth.serverActions.login
  })
  login(params: { email: string, password: string }) {
    let res = fetchLogin(params)

    res.then(data => {
      if (data) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
      }
    }).catch(e => {
      if (e.response) {
        localStorage.removeItem('access_token');
      }
    })

    return res
  }

  @serviceFetch({
    serverAction: stores.auth.serverActions.getUser
  })
  getUser() {
    let res = fetchGetUser({})

    res.then(data => {
      if (data) {
        this.authStore.user = new UserModel(UserAdapter.adaptUser(data))
      }
    })

    return res
  }
}
