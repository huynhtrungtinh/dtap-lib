import {Options} from '@dtap/ui-scl';
import {getAccessToken} from './oauth';

const fetchJson = async (url: string, options: Options = {method: 'GET'}, ignoreToken: boolean = false) => {
    let outPut: any = {
        status: 400,
        headers: null,
        data: null,
        blob: null,
        response: null
    }
    if (options.response) {
        return options.response;
    } else {
        if (options.isFile && options.method === 'GET') {
            outPut = await new Promise((accept, reject) => {
                let req = new XMLHttpRequest();
                req.open('GET', url, true);
                req.responseType = 'arraybuffer';
                req.setRequestHeader('authorization', `Bearer ${getAccessToken()}`);
                req.onload = (e) => {
                    let resp = req.response;
                    outPut.status = req.status;
                    outPut.response = req.response;
                    if (resp) {
                        outPut.blob = resp;
                    }
                    accept(outPut);
                };
                req.send(null);
                if (req.status !== 200) {
                    outPut.status = -1;
                    outPut.response = null;
                    outPut.data = {
                        code: -1,
                        message: 'Request failed'
                    };
                    accept(outPut);
                }
            });
        } else {
            const requestHeaders =
                options.headers ||
                new Headers({
                    Accept: 'application/json',
                });
            if (
                !requestHeaders.has('Content-Type') &&
                !(options && options.body && options.body instanceof FormData)
            ) {
                requestHeaders.set('Content-Type', 'application/json');
            }
            const token = getAccessToken();
            if (token && !ignoreToken) {
                requestHeaders.set('Authorization', `Bearer ${token}`);
            }
            const requestInit: RequestInit = {
                ...options,
                body: options.body,
                headers: requestHeaders,
                method: options.method
            }
            // mode: 'cors'
            console.log('============fetchJson==============');
            console.log('url: ', url);
            console.log('requestInit: ', requestInit);
            console.log('====================================');
            const response: any = await fetch(url, {...requestInit})
                .then(function (res: any) {
                    return res;
                })
                .catch(function (error: any) {
                    console.log('Request failed', error)
                    return {
                        data: {code: -1, message: `Request failed ${error}`},
                        status: -1
                    }
                });
            if (response && response.status !== -1) {
                const textIn = await response.text();
                let json;
                try {
                    json = JSON.parse(textIn);
                } catch (e) {
                    console.log("e: ", e)
                    json = null;
                }
                outPut.response = response;
                outPut.status = response.status;
                outPut.headers = response.headers;
                outPut.data = json;
                if (options.isFile && response.blob()) {
                    outPut.blob = response.blob();
                }
            } else {
                outPut.data = response.data;
                outPut.status = response.status;
            }
        }
    }
    return outPut;
};

export default fetchJson;
export {fetchJson};

