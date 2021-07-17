import {Base} from "./base";
import api from "../common/api";
import {AxiosResponse} from "axios";
import {loginResponse} from "../common/types";
import User from "../models/user";


export default class Auth extends Base {
  static login(data: { email: string, password: string }): Promise<AxiosResponse<loginResponse>> {
    return api.post<loginResponse>('auth/login', data)
  }

  static getUser(): Promise<AxiosResponse<User>> {
    return api.get<User>('auth/user')
  }
}