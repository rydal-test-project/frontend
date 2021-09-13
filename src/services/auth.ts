import {inject} from "react-ioc";

import {Base} from "./base";
import {AppStore, AuthStore} from "@stores";
import {fetchLogin, ILoginFetchResponse} from "@requests";


export class AuthService extends Base {
  @inject(AppStore) appStore!: AppStore;
  @inject(AuthStore) authStore!: AuthStore;

  login(data: { email: string, password: string }): Promise<ILoginFetchResponse | null> {
    return fetchLogin(data)
/*    this.appStore.setPending(pending.LOGIN);
    authServiceLogger('login started');

    return api.post<loginResponse>('auth/login', data).then(res => {
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);

      return res;
    }).finally(() => {
      this.appStore.unSetPending(pending.LOGIN);
      authServiceLogger('login finished');
    });*/
  }

/*  init(): Promise<AxiosResponse<userDataResponse>> | null {
    if (localStorage.getItem('access_token')) {
      authServiceLogger('init started');
      this.appStore.setPending(pending.INIT_USER);

      const res = api.get<userDataResponse>('auth/user').then(res => {
        const data = res.data.data;

        authServiceLogger('accepted');

        if (data) {
          this.modelData.user.setInfo(data);
        }

        return res;
      }).catch(error => {
        if (error?.response) {
          localStorage.removeItem('access_token');
        }

        return error;
      });

      res.finally(() => {
        this.appStore.unSetPending(pending.INIT_USER);
      });

      return res;
    }

    return null
  }*/
}
