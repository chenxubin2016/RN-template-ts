import qs from 'qs';

const baseUrl = '';
export const post = (params: any, url: String) => {
    const init = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }
    return new Promise((resolve:(value:any)=>any, reject) => {
        fetch(baseUrl + url, init)
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                }
            }).catch(error => reject(error))
    })
}
export const get = (params: any, url: String) => {
    const init = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const _url = baseUrl + url + qs.stringify(params)
    return new Promise((resolve: (value: any)=>any, reject) => {
        fetch(_url, init)
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                }
            }).catch(error => reject(error))
    })
};
export const upload = (params: any, url: String) => {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const _url = baseUrl + url;
    return new Promise((resolve, reject) => {
        fetch(_url, init)
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                }
            }).catch(error => reject(error))
    })
};
type Method = 'GET' | 'POST'
type HeadersInit_ = Headers | string[][] | { [key: string]: string };
type BodyInit_ =
    | _SourceUri
    | Blob
    | Int8Array
    | Int16Array
    | Int32Array
    | Uint8Array
    | Uint16Array
    | Uint32Array
    | Uint8ClampedArray
    | Float32Array
    | Float64Array
    | DataView
    | ArrayBuffer
    | FormData
    | string
    | null;

interface Params {
    method: Method,
    headers?: HeadersInit_,
    body?: BodyInit_
}

export default (url, params: Params) => {
    let _url = baseUrl + url
    const init = Object.assign({}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }, params)
    if (init.method === 'GET') {
        _url = baseUrl + url + qs.stringify(init.body)
    }
    return new Promise((resolve:(value:any)=>any, reject) => {
        fetch(_url, init)
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                }
            }).catch(error => reject(error))
    })
}
