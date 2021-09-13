import {AxiosResponse, AxiosError} from "axios";

export class BaseFetch <TData, TPayload> {
    fetchCallback: (payload: TPayload) => Promise<AxiosResponse<TData>>;

    constructor(fetchCallback: (payload: TPayload) => Promise<AxiosResponse<TData>>) {
        this.fetchCallback = fetchCallback

        this.fetch = this.fetch.bind(this)
    }

    beforeFetch?: () => void
    successFetch?: (data: TData) => void
    failureFetch?: (e: AxiosError) => void
    finallyFetch?: () => void

    async fetch(payload: TPayload): Promise<TData | null> {
        const { beforeFetch, successFetch, failureFetch, finallyFetch } = this
        beforeFetch && beforeFetch()
        let res = null;

        try {
            res = await this.fetchCallback(payload)
            successFetch && successFetch(res.data)
        } catch (e) {
            failureFetch && failureFetch(e as AxiosError)
            console.warn(e)
        } finally {
            finallyFetch && finallyFetch()
        }

        return res?.data || null
    }
}