
import { FAILURE_KEY, IUserInfoOutPut, REQUEST_KEY, SUCCESS_KEY } from '@dtap/ui-scl';
import { getAccessToken, getRefreshToken } from '@dtap/ui-utils';
import { checkTokenExpiration, effectTokenExpiration, fetchEnd, fetchError, fetchStart } from '../../actions';

interface IEffectProvider {
    action: any;
    dispatch: any;
    getState: any;
}



function effectProvider({action, dispatch, getState}: IEffectProvider) {
    const {
        type,
        payload,
        meta: {fetch: fetchMeta, onResponse, ...meta},
    } = action;
    const restType = fetchMeta;
    dispatch(fetchStart());
    dispatch({type: `${type}/${REQUEST_KEY}`});
    (window as any).dataProvider.getDataProvider(restType, meta.resource, payload).then(async (response: any) => {
        let onResponseIn = onResponse;
        if (typeof onResponseIn === 'function') {
            onResponseIn = onResponse({dispatch, getState, result: response})
            if (onResponseIn instanceof Promise) {
                onResponseIn = {}
            }
        }

        dispatch({
            type: `${type}/${SUCCESS_KEY}`,
            payload: response,
            meta: {
                ...meta,
                ...onResponseIn,
                fetchResponse: restType
            }
        })
        dispatch(fetchEnd());
    }).catch((error: any) => {
        let onResponseIn = onResponse;
        if (typeof onResponseIn === 'function') {
            onResponseIn = onResponse(
                {
                    dispatch, getState, result: {
                        blob: null,
                        data: error,
                        headers: null,
                        response: null,
                        status: 500
                    }
                }
            )
            if (onResponseIn instanceof Promise) {
                onResponseIn = {}
            }
        }
        dispatch({
            type: `${type}/${FAILURE_KEY}`,
            payload: error.body ? error.body : null,
            meta: {
                ...meta,
                ...onResponseIn,
                fetchResponse: restType
            }
        })
        dispatch(fetchError());
    })
}

const createAPIMiddleware = () => ({dispatch, getState}: any) => (next: any) => (action: any) => {
    let dataProvider: any = null;
    if ((window as any).dataProvider) {
        dataProvider = (window as any).dataProvider;
    }
    if (!dataProvider) {
        // console.warn('api needed dataProvider');
        return next(action);
    }
    if (action.type.indexOf('@DGS/API') > -1
        && [REQUEST_KEY, SUCCESS_KEY, FAILURE_KEY].every(item => (action.type.indexOf(item) === -1))) {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();
        const tokenExp = checkTokenExpiration(accessToken, refreshToken);
        if (tokenExp.isRefresh || !tokenExp.token) {
            dispatch(effectTokenExpiration(true)).then((res: IUserInfoOutPut) => {
                if (res.status === 200) {
                    effectProvider({action, dispatch, getState});
                }
            });
        } else {
            effectProvider({action, dispatch, getState});
        }
    } else {
        return next(action);
    }
}
export default createAPIMiddleware;
export { createAPIMiddleware };

