import {Debugger} from "debug";
import {AxiosResponse} from "axios";
import {isArray} from "lodash";

import {BaseFactory} from "./base";
import {fetchDebugger} from "@debug";
import {BaseFetch} from "../requests/base";
import {ServerActionModel} from "@models";


export class FetchFactory<TData, TPayload> extends BaseFactory {
    fetchName: string
    logger?: Debugger
    serverActions: ServerActionModel[] = []

    constructor(fetchName: string) {
        super();
        this.fetchName = fetchName

        return this
    }

    addDebugger (name?: string) {
        this.logger = fetchDebugger.extend(name || this.fetchName)

        return this
    }
    addServerActions (serverActions: ServerActionModel | ServerActionModel[]) {
        this.serverActions = isArray(serverActions) ? serverActions : [serverActions]

        return this
    }

    make(fetch: (payload: TPayload) => Promise<AxiosResponse<TData>>): (payload: TPayload) => Promise<TData | null> {
        const { logger, serverActions } = this
        const newFetch = new BaseFetch<TData, TPayload>(fetch)

        newFetch.failureFetch = (e) => {
            logger && logger('failure %o', e)
            serverActions.forEach(serverAction => serverAction.setFailure(e))
        }
        newFetch.successFetch = (data) => {
            logger && logger('success %o', data)
            serverActions.forEach(serverAction => serverAction.setSuccess())
        }
        newFetch.beforeFetch = () => {
            logger && logger('started...')
            serverActions.forEach(serverAction => serverAction.setPending())
        }
        newFetch.finallyFetch = () => {
            logger && logger('finished...')
        }

        return newFetch.fetch
    }
}