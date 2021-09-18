import {AxiosError} from "axios";
import {defaultAxiosResponse, defaultResponse} from "../common/types";

export class BaseFetch <TData, TPayload> {
    fetchCallback: (payload: TPayload) => defaultAxiosResponse<TData>;

    constructor(fetchCallback: (payload: TPayload) => defaultAxiosResponse<TData>) {
        this.fetchCallback = fetchCallback

        this.fetch = this.fetch.bind(this)
    }

    beforeFetch?: () => void
    successFetch?: (data: TData | null) => void
    failureFetch?: (e: AxiosError) => void
    finallyFetch?: () => void

    fetch(payload: TPayload): defaultResponse<TData> {
        const { beforeFetch, successFetch, failureFetch, finallyFetch } = this
        beforeFetch && beforeFetch()
        let res = this.fetchCallback(payload);


        res.catch(e => {
            failureFetch && failureFetch(e as AxiosError)
            console.warn(e)
        }).finally(() => {
            finallyFetch && finallyFetch()
        })

        return res.then(response => {
            const data = response.data || null
            successFetch && successFetch(data)

            return data
        })
    }
}