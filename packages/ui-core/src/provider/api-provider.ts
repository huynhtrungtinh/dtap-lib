import {CREATE, CRUD_CREATE, CRUD_DELETE, CRUD_GET, CRUD_UPDATE, DELETE, GET, IOutPutCallApi, UPDATE} from '@dtap/ui-scl';

const api = {
    get: (resource: string, params?: object) => async (dispatch: any): Promise<IOutPutCallApi> => {
        return new Promise((resolve: any) => {
            dispatch({
                type: CRUD_GET,
                payload: params || {},
                meta: {
                    resource,
                    fetch: GET,
                    onResponse: (res: IOutPutCallApi) => {
                        resolve(res);
                    }
                }
            });
        })
    },
    create: (resource: string, params?: object) => async (dispatch: any): Promise<IOutPutCallApi> => {
        return new Promise((resolve: any) => {
            dispatch({
                type: CRUD_CREATE,
                payload: params || {},
                meta: {
                    resource,
                    fetch: CREATE,
                    onResponse: (res: IOutPutCallApi) => {
                        resolve(res);
                    }
                }
            });
        })
    },
    update: (resource: string, params?: object) => async (dispatch: any): Promise<IOutPutCallApi> => {
        return new Promise((resolve: any) => {
            dispatch({
                type: CRUD_UPDATE,
                payload: params || {},
                meta: {
                    resource,
                    fetch: UPDATE,
                    onResponse: (res: IOutPutCallApi) => {
                        resolve(res);
                    }
                }
            });
        })
    },
    delete: (resource: string, params?: object) => async (dispatch: any): Promise<IOutPutCallApi> => {
        return new Promise((resolve: any) => {
            dispatch({
                type: CRUD_DELETE,
                payload: params || {},
                meta: {
                    resource,
                    fetch: DELETE,
                    onResponse: (res: IOutPutCallApi) => {
                        resolve(res);
                    }
                }
            });
        })
    }
}

export {api};
export default api;
