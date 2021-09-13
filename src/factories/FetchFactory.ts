import {BaseFactory} from "./base";
import {Debugger} from "debug";
import {AxiosResponse} from "axios";

import {fetchLogger} from "../debug/fetch";
import {BaseFetch} from "../requests/base";
import {PendingStateStore} from "@stores";


export class FetchFactory <TData, TPayload> extends BaseFactory {
    fetchName: string
    logger?: Debugger
    pendingStore?: PendingStateStore

    constructor(fetchName: string) {
        super();
        this.fetchName = fetchName

        return this
    }

    addLogger (name?: string) {
        this.logger = fetchLogger.extend(name || this.fetchName)

        return this
    }
    addPending (pendingStore: PendingStateStore) {
        this.pendingStore = pendingStore

        return this
    }

    make(fetch: (payload: TPayload) => Promise<AxiosResponse<TData>>): (payload: TPayload) => Promise<TData | null> {
        const { logger, pendingStore } = this
        const newFetch = new BaseFetch<TData, TPayload>(fetch)

        newFetch.failureFetch = (e) => {
            logger && logger('failure %o', e)
            pendingStore && pendingStore.setPending()
        }
        newFetch.successFetch = (data) => {
            logger && logger('success %o', data)
        }
        newFetch.beforeFetch = () => {
            logger && logger('started...')
        }
        newFetch.finallyFetch = () => {
            logger && logger('finished...')
        }

        return newFetch.fetch
    }
}