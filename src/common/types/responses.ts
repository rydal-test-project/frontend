export type userDataResponse = {
  id: number;
  email: string;
  name: string;
  surname: string;
  patronymic: string;
  phone_number: string;
};
export type loginResponse = { access_token: string; refresh_token: string; token_type: string; expires_in: number };
