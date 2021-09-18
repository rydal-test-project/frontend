import {omit} from "lodash";

import { inst } from '@api'
import {defaultResponseData} from "@specs";


type defaultParams<RequestParams> = RequestParams & {
    url: string
}

type getRequestOptions = {
}

const adaptRequestParams = <RequestParams>(params: defaultParams<RequestParams>) => {
    return omit(params, ['url'])
}


const get = <ResponseData, RequestParams>(params: defaultParams<RequestParams>, options?: getRequestOptions): Promise<ResponseData | null> => {
    const res = inst.get<defaultResponseData<ResponseData>>(params.url, {
        params: adaptRequestParams(params)
    })

    res.catch(e => {
        console.warn(e)
    })

    return res.then(res => {
        return res.data.data || null
    })
}

export {
    get
}