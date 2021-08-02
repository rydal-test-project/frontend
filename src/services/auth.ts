import {Base} from "./base";
import api from "../common/api";
import {AxiosResponse} from "axios";
import {loginResponse} from "../common/types";


export default class AuthService extends Base {
  login(data: { email: string, password: string }): Promise<AxiosResponse<loginResponse>> {

    return api.post<loginResponse>('auth/login', data)
  }

/*  static getUser(): Promise<AxiosResponse<User>> {
    Auth.login({ email, password})
      .then(res => {
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        stores.userStore.setIsLogged(true);
      })
      .catch(err => {
        console.error(err);
        setPassword('');
      })
      .finally(() => stores.userStore.setInLoggingState(false))
  }*/
}
