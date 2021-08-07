import {userData} from "./data";


export type apiResponse <t>  = {
  data: t | null;
  messages?: string;
  errors?: string[];
}
export interface userDataResponse extends apiResponse<userData> { }
export type loginResponse = { access_token: string; refresh_token: string; token_type: string; expires_in: number };
