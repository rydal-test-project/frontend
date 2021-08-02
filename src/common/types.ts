export type modelData = { [key: string]: unknown }
export type loginResponse = { access_token: string, refresh_token: string, token_type: string, expires_in: number }
export type dictionary<t> = { [key: string]: t }
