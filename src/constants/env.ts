import {dictionary} from "../common/types";


export const env = {
  URL_API: process.env.REACT_APP_URL_API as string,
  URL_GQ: String(process.env.REACT_APP_URL_GQ),
  USE_DEBUG: process.env.REACT_APP_USE_LOGS === 'true'
} as dictionary<string | boolean>;