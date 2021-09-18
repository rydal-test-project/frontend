import {gqPaginatorData} from "./data";
import {AxiosResponse} from "axios";


export type gqResponseWithPaginate <t> = {
  data: t[],
  paginatorInfo: gqPaginatorData
}

export type defaultResponse<T> = Promise<T | null>
export type defaultAxiosResponse<T> = Promise<AxiosResponse<T | undefined>>
