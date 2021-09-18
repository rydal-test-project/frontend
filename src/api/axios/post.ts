import { inst } from '@api'
import { defaultResponseData } from "@specs";


type defaultParams<RequestParams> = {
    url: string,
    data: RequestParams
}
type postRequestOptions = {
}

const post = <ResponseData, RequestParams>(params: defaultParams<RequestParams>, options?: postRequestOptions): Promise<ResponseData | null> => {
    const res = inst.post<defaultResponseData<ResponseData>>(params.url, params.data)

    res.catch(e => {
        console.warn(e)
    })

    return res.then(res => {
        return res.data.data|| null
    })
}

export {
    post
}