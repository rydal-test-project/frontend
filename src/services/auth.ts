import {Base} from "./base";
import api from "../common/api";
import {AxiosResponse} from "axios";
import {loginResponse} from "../common/types";
import {inject} from "react-ioc";
import AppStore from "../stores/appStore";
import {pending} from "../constants";
import {authServiceLogger} from "../debug/services";


export default class AuthService extends Base {
  @inject(AppStore) appStore!: AppStore;

  login(data: { email: string, password: string }): Promise<AxiosResponse<loginResponse>> {
    this.appStore.setPending(pending.LOGIN);
    authServiceLogger('login started');

    return api.post<loginResponse>('auth/login', data).then(res => {
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);

      return res;
    }).finally(() => {
      this.appStore.unSetPending(pending.LOGIN);
      authServiceLogger('login finished');
    });
  }

  init(): void {
    this.appStore.setPending(pending.INIT_USER);
    authServiceLogger('init started');


    if (localStorage.getItem('access_token')) {
      api.get<loginResponse>('auth/user').then(res => {
        console.log(res)
      }).catch(() => {
        localStorage.removeItem('access_token');
      }).finally(() => {
        this.appStore.unSetPending(pending.INIT_USER);
        authServiceLogger('init finished');
      })
    }
  }
}
