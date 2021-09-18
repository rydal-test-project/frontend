import {inject} from "react-ioc";

import {Base} from "./base";
import {fetchGetUser, fetchLogin} from "@requests";
import {AuthStore, stores} from "@stores";
import {UserModel} from "@models";
import {UserAdapter} from "@adapters";
import {AxiosError} from "axios";
import {serviceFetch} from "@utils";


export class AuthService extends Base {
  @inject(AuthStore) authStore!: AuthStore;

  @serviceFetch({
    serverAction: stores.auth.serverActions.login
  })
  login(params: { email: string, password: string }) {
    let res = fetchLogin(params)

    res.then(res => {
      if (res.data) {
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
      }
    }).catch(e => {
      console.log(e)

      if ((e as AxiosError)?.response) {
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

    res.then(res => {
      if (res.data) {
        this.authStore.user = new UserModel(UserAdapter.adaptUser(res.data))
      }
    }).catch(e => {
      console.log(e)

    })

    return res
  }
}
