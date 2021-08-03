import {Base} from "./base";
import api from "../common/api";
import {AxiosResponse} from "axios";
import {loginResponse, userDataResponse} from "../common/types";
import {inject} from "react-ioc";
import AppStore from "../stores/appStore";
import {pending} from "../constants";
import {authServiceLogger} from "../debug/services";
import ModelsData from "../models";


export default class AuthService extends Base {
  @inject(AppStore) appStore!: AppStore;
  @inject(ModelsData) modelData!: ModelsData;

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

  init(): Promise<AxiosResponse<userDataResponse>> | null {
    if (localStorage.getItem('access_token')) {
      authServiceLogger('init started');
      this.appStore.setPending(pending.INIT_USER);

      const res = api.get<userDataResponse>('auth/user').then(res => {
        const data = res.data;

        this.modelData.user.setInfo(data);

        authServiceLogger('accepted');

        return res;
      }).catch(error => {
        localStorage.removeItem('access_token');

        return error;
      });

      res.finally(() => {
        this.appStore.unSetPending(pending.INIT_USER);
      });

      return res;
    }

    return null
  }
}
