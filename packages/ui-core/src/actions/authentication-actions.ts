import {AUTH_REDUCER_NAME, CHECK_TOKEN, DB_NAME, DB_STORE_I18N_EN, DB_STORE_I18N_VI, DB_VERSION, FAILURE, FETCH_END, FETCH_ERROR, FETCH_START, IAuthenProvider, IAuthenProviderOutPut, IDoLoginOutPut, IRouter, IUserInfo, IUserInfoOutPut, LOGIN, LOGOUT, PATH_TO_STORE_AUTH, REFRESH_TOKEN, SET_ROUTERS, SHOW_SIGNIN_EXP_TIME, SUCCESS, USER_AGENT} from '@dtap/ui-scl';
import {clearToken, config, fetchJson, getAccessToken, getMinutes2Dates, getRefreshToken, parseJwt, redirect, setToken} from '@dtap/ui-utils';
import Dexie from 'dexie';
import {get} from 'lodash';
import {loadTranslations} from "react-redux-i18n";

const authenProvider: IAuthenProvider = {
    doLogin: async (username: string, password: string) => {
        const body = new URLSearchParams();
        body.append("client_id", config.getClienId());
        body.append("client_secret", config.getClientSecret());
        body.append("grant_type", "password");
        body.append("scope", "openid");
        body.append("username", username);
        body.append("password", password);
        const response = await fetch(`${config.getApiURI()}${config.getApiOauthFrefix()}`, {
            method: "POST",
            headers: new Headers({
                // "user-agent": USER_AGENT,
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            }),
            body,
        });
        let val = response.body
        console.log('response: ', val, response);
        const textIn = await response.text();
        console.log('textIn: ', textIn);
        let dataFinal: any = {};
        try {
            dataFinal = JSON.parse(textIn);
        } catch (error) {
            console.log('====================================');
            console.log('error: ', error);
            console.log('textIn: ', textIn);
            console.log('====================================');
        }
        let outPut: IDoLoginOutPut = {
            status: 400,
        };
        if (response.status === 200 && dataFinal.access_token) {
            const accessToken = dataFinal.access_token;
            const refreshToken = dataFinal.refresh_token;
            outPut.access_token = accessToken;
            outPut.refresh_token = refreshToken;
            outPut.status = 200;
            outPut.statusText = response.statusText;
            outPut.body = dataFinal;
        } else {
            outPut = {
                status: response.status,
                statusText: response.statusText,
                body: dataFinal
            }
        }
        return outPut;
    },
    doRefresh: async (refreshToken: string) => {
        const body = new URLSearchParams();
        body.append("client_id", config.getClienId());
        body.append("client_secret", config.getClientSecret());
        body.append("scope", "openid");
        body.append("grant_type", "refresh_token");
        body.append("refresh_token", refreshToken);
        const response = await fetch(`${config.getApiURI()}${config.getApiOauthFrefix()}`, {
            method: "POST",
            headers: new Headers({
                // "user-agent": USER_AGENT,
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            }),
            body
        });
        const textIn = await response.text();
        let dataFinal: any = {};
        try {
            dataFinal = JSON.parse(textIn);
        } catch (error) {
            console.log('====================================');
            console.log('error: ', error);
            console.log('textIn: ', textIn);
            console.log('====================================');
        }
        let outPut: IDoLoginOutPut = {
            status: 400,
        };
        if (response.status === 200 && dataFinal.access_token) {
            const accessToken = dataFinal.access_token;
            const refreshToken = dataFinal.refresh_token;
            outPut.access_token = accessToken;
            outPut.refresh_token = refreshToken;
            outPut.status = 200;
            outPut.statusText = response.statusText;
            outPut.body = dataFinal;
        } else {
            outPut = {
                status: response.status,
                statusText: response.statusText,
                body: dataFinal
            }
        }
        return outPut;
    },
    doLogout: async () => {
        let outPut: IAuthenProviderOutPut = {
            status: 200
        };
        return outPut;
    },
    getResourceAccess: async () => {
        let outPut: IAuthenProviderOutPut = {
            status: 400
        };
        return outPut;
    },
    checkToken: async (token: string) => {
        const response = await fetch(`${config.getApiURI()}${config.getApiOauthFrefix()}`, {
            method: "GET",
            headers: new Headers({
                "user-agent": USER_AGENT,
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
                "authorization": `Bearer ${token}`
            }),
        });
        const textIn = await response.text();
        let dataFinal: any = {};
        try {
            dataFinal = JSON.parse(textIn);
        } catch (error) {
            console.log('====================================');
            console.log('error: ', error);
            console.log('textIn: ', textIn);
            console.log('====================================');
        }
        let outPut: IUserInfoOutPut = {
            status: 400,
        };
        if (response.status === 200 && dataFinal.username) {
            const userInfo: IUserInfo = {
                display_name: dataFinal.displayName,
                email: dataFinal.email,
                username: dataFinal.username,
                first_login: typeof dataFinal.first_login === 'boolean' ? dataFinal.first_login : false,
                reset_password: typeof dataFinal.reset_password === 'boolean' ? dataFinal.reset_password : false,
                is_cloud: typeof dataFinal.is_cloud === 'boolean' ? dataFinal.is_cloud : false
            }
            outPut.status = 200;
            outPut.userInfo = userInfo;
        } else {
            outPut = {
                status: response.status,
                statusText: response.statusText,
                body: dataFinal
            }
        }
        return outPut;
    },
    getUserInfo: async (accessToken: string) => {
        const jwtData: any = parseJwt(accessToken);
        let outPut: IUserInfoOutPut = {
            status: 400,
        };
        if (jwtData) {
            const userInfo: IUserInfo = {
                display_name: jwtData.displayName,
                email: jwtData.email,
                username: jwtData.username,
                first_login: typeof jwtData.first_login === 'boolean' ? jwtData.first_login : false,
                reset_password: typeof jwtData.reset_password === 'boolean' ? jwtData.reset_password : false,
                is_cloud: typeof jwtData.is_cloud === 'boolean' ? jwtData.is_cloud : false
            }
            outPut.status = 200;
            outPut.userInfo = userInfo;
        }
        return outPut;
    },
    getI18n: async () => {
        const response = await fetchJson(`${config.getApiURI()}/apps/designer/translate`);
        let outPut: IAuthenProviderOutPut = {
            status: 400,
        };
        if (response.status === 200) {
            outPut.status = 200;
            outPut.body = response.data;
        } else {
            outPut = {
                status: response.status,
                statusText: response.statusText,
                body: []
            }
        }
        return outPut;
    }
}

const setAuthRouters = (routers: IRouter[]) => async (dispatch: any) => {
    dispatch(executeActionReducerAuth(SET_ROUTERS, {routers}));
}

function checkTokenExpiration(accessToken?: string, refreshToken?: string) {
    if (!accessToken || !refreshToken) {
        accessToken = getAccessToken();
        refreshToken = getRefreshToken();
    }
    const jwtDataAT: any = parseJwt(accessToken) || null;
    const jwtDataRT: any = parseJwt(refreshToken) || null;
    const timeAT: any = jwtDataAT && jwtDataAT.exp || null;
    const timeRT: any = jwtDataRT && jwtDataRT.exp || null;
    console.log('=========checkTokenExpiration=======');
    console.log('jwtDataAT: ', jwtDataAT);
    console.log('jwtDataRT: ', jwtDataRT);
    console.log('timeAT: ', timeAT);
    console.log('timeRT: ', timeRT);
    console.log('====================================');
    let outPut: any = {
        isRefresh: false,
        token: null,
        isReSingin: false
    };
    if (timeAT || timeRT) {
        const expTimeAT = getMinutes2Dates(new Date(timeAT * 1000));
        const expTimeRT = getMinutes2Dates(new Date(timeRT * 1000));
        console.log('new Date(timeAT): ', new Date(timeAT * 1000));
        console.log('expTimeAT: ', expTimeAT);
        console.log('expTimeRT: ', expTimeRT);
        if (expTimeAT > 0) {
            outPut.token = accessToken
        } else if (expTimeRT > 0) {
            outPut.token = refreshToken
            outPut.isRefresh = true;
        }
    }
    if (outPut.token === null) {
        outPut.isReSingin = true
    }
    return outPut;
}

const effectTokenExpiration = (holdPage?: boolean) => async (dispatch: any, getState: any) => {
    const state = get(getState(), PATH_TO_STORE_AUTH, {});
    const authenProvider = state.authenProvider;
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const tokenExp = checkTokenExpiration(accessToken, refreshToken);
    let isError = true;
    let outPut: IUserInfoOutPut = {
        status: 400,
    };
    console.log('========effectTokenExpiration=======');
    console.log('tokenExp: ', tokenExp);
    console.log('====================================');
    if (tokenExp.token) {
        outPut = await authenProvider.checkToken(tokenExp.token);

        if (outPut.status === 200) {
            isError = false;
            outPut.status = 200;
            dispatch({
                type: SUCCESS(CHECK_TOKEN),
                payload: {
                    isAuthenticatedStatusCode: outPut.status,
                    isAuthenticated: true,
                    isCheckToken: true,
                    userInfo: outPut.userInfo
                }
            });
        }
        if (tokenExp.isRefresh) {
            const authRefresh = await dispatch(setAuthRefresh());
            outPut.status = authRefresh.status;
            if (authRefresh.status !== 200) {
                isError = true;
                if (holdPage === true) {
                    isError = false;
                    outPut.status = 401;
                    dispatch(showSigninExpTime(true));
                }
            } else {
                isError = false;
            }
        }
    } else {
        if (holdPage === true) {
            isError = false;
            outPut.status = 401;
            dispatch(showSigninExpTime(true));
        } else if (tokenExp.isReSingin && (accessToken || refreshToken)) {
            isError = false;
            outPut.status = 401;
            dispatch(showSigninExpTime(true));
        }
    }
    if (isError) {
        dispatch(setAuthLogout());
    } else {
        dispatch(effectI18nLocal());
    }
    return outPut;
}

const executeActionReducerAuth = (type: string, payload: any) => {
    return {type, payload, meta: {resource: AUTH_REDUCER_NAME}};
};

const showSigninExpTime = (open: boolean) => async (dispatch: any) => {
    const pathname = window.location.pathname;
    if (pathname === "/") {
        dispatch(setAuthLogout(true));
    } else {
        dispatch(executeActionReducerAuth(SHOW_SIGNIN_EXP_TIME, {openSigninExpirationTime: open, isAuthenticated: true, isCheckToken: !open, isAuthenticatedStatusCode: 401}));
    }
}

const setAuthLoginFailure = () => async (dispatch: any) => {
    dispatch(executeActionReducerAuth(FAILURE(LOGIN), {}));
}

const setAuthLogin = (username: string, password: string) => async (dispatch: any, getState: any) => {
    const state = get(getState(), PATH_TO_STORE_AUTH, {});
    const authenProvider = state.authenProvider;
    const response = await authenProvider.doLogin(username, password);
    if (response.status === 200) {
        const {access_token, refresh_token} = response;
        setToken(access_token, refresh_token);
        const userInfo = await authenProvider.getUserInfo(access_token);
        if (userInfo.status === 200) {
            dispatch(executeActionReducerAuth(SUCCESS(LOGIN), {
                isAuthenticatedStatusCode: userInfo.status,
                isAuthenticated: true,
                isCheckToken: true,
                userInfo: userInfo.userInfo
            }));
            dispatch(effectI18nLocal());
        }
    }
    return response;
};

function parseI18n(i18nData: any = []) {
    let outPut: any = {
        en: {},
        vi: {}
    }
    console.log("data: ", i18nData);
    if (i18nData) {
        i18nData.map((item: any) => {
            outPut.en[item.key] = item.en;
            outPut.vi[item.key] = item.vi;
        })
    }
    return outPut;
}

function convertDataToIndexDB({vi = [], en = []}: any) {
    let outPut: any = {
        en: [],
        vi: [],
    }
    let i18nFinalEN = Object.keys(en);
    let i18nENIndex = 0;
    if (i18nFinalEN) {
        i18nFinalEN.map(async (key: any) => {
            outPut.en.push({
                id: i18nENIndex++,
                gui_key: key,
                value: JSON.stringify(en[key])
            })
        })
    }

    let i18nFinalVI = Object.keys(vi);
    let i18nVIIndex = 0;
    if (i18nFinalEN) {
        i18nFinalVI.map(async (key: any) => {
            outPut.vi.push({
                id: i18nVIIndex++,
                gui_key: key,
                value: JSON.stringify(vi[key])
            })
        })
    }
    return outPut;
}

const effectI18nLocal = () => async (dispatch: any, getState: any) => {
    const state = get(getState(), PATH_TO_STORE_AUTH, {});
    const authenProvider = state.authenProvider;
    // const isAuthenticated = state.isAuthenticated;
    // if (!isAuthenticated) {return;}
    let db: any = new Dexie(DB_NAME);
    // create the store
    db.version(DB_VERSION).stores({[DB_STORE_I18N_VI]: '++id,gui_key,value', [DB_STORE_I18N_EN]: '++id,gui_key,value'});
    let i18nFinal: any = await db[DB_STORE_I18N_VI].toArray();
    if (i18nFinal.length === 0) {
        const i18nData = await authenProvider.getI18n();
        i18nFinal = parseI18n(i18nData.body);
        const {en = [], vi = []}: any = convertDataToIndexDB({vi: i18nFinal.vi, en: i18nFinal.en})
        db[DB_STORE_I18N_EN].bulkPut(en).then((e: any) => console.log(e));
        db[DB_STORE_I18N_VI].bulkPut(vi).then((e: any) => console.log(e));
        dispatch(addI18nLocal(i18nFinal));
    } else {
        i18nFinal = {vi: {}, en: {}}
        await db.table(DB_STORE_I18N_VI).each((obj: any, cursor: any) => {
            i18nFinal.vi[obj.gui_key] = JSON.parse(obj.value);
        });
        await db.table(DB_STORE_I18N_EN).each((obj: any, cursor: any) => {
            i18nFinal.en[obj.gui_key] = JSON.parse(obj.value);
        });
        dispatch(addI18nLocal(i18nFinal));
    }
}

const addI18nLocal = (i18nLocal?: any) => async (dispatch: any, getState: any) => {
    if (!i18nLocal) {
        i18nLocal = {
            en: {},
            vi: {}
        }
    }
    const i18nCurrent = get(getState(), 'i18n.translations', {en: {}, vi: {}});
    let outPut: any = {
        en: {
            ...i18nCurrent.en,
            ...i18nLocal.en,
        },
        vi: {
            ...i18nCurrent.vi,
            ...i18nLocal.vi
        }
    }
    dispatch(loadTranslations(outPut));
}

const setAuthLogout = (deleteDblocal: boolean = true) => async (dispatch: any, getState: any) => {
    const state = get(getState(), PATH_TO_STORE_AUTH, {});
    const isAuthenticated = state.isAuthenticated;
    if (deleteDblocal) {
        let dbLocal: any = new Dexie(DB_NAME);
        dbLocal.close();
        dbLocal.delete();
    }
    let response = {status: 400};
    if (isAuthenticated) {
        const authenProvider = state.authenProvider;
        response = await authenProvider.doLogout();
        if (response.status === 200) {
            clearToken();
            dispatch(executeActionReducerAuth(SUCCESS(LOGOUT), {}));
            redirect('/signin');
        }
    }
    return response;
}

const setAuthRefresh = () => async (dispatch: any, getState: any) => {
    const state = get(getState(), PATH_TO_STORE_AUTH, {});
    const authenProvider = state.authenProvider;
    const refreshToken = getRefreshToken();
    const response = await authenProvider.doRefresh(refreshToken);
    if (response.status === 200) {
        const {access_token, refresh_token} = response;
        setToken(access_token, refresh_token);
        const userInfo = await authenProvider.getUserInfo(access_token);
        let payload: any = {};
        if (userInfo.status === 200) {
            payload = {
                isAuthenticatedStatusCode: userInfo.status,
                isAuthenticated: true,
                isCheckToken: true,
                userInfo: userInfo.userInfo
            }
        }
        dispatch(executeActionReducerAuth(SUCCESS(REFRESH_TOKEN), payload));
    }
    return response;
}

const fetchStart = () => async (dispatch: any) => {
    dispatch(executeActionReducerAuth(FETCH_START, {}));
}

const fetchEnd = () => async (dispatch: any) => {
    dispatch(executeActionReducerAuth(FETCH_END, {}));
}

const fetchError = () => async (dispatch: any) => {
    dispatch(executeActionReducerAuth(FETCH_ERROR, {}));
}

export {fetchStart, fetchEnd, fetchError, authenProvider, effectI18nLocal, addI18nLocal, setAuthRouters, showSigninExpTime, effectTokenExpiration, setAuthLogin, setAuthLogout, checkTokenExpiration, setAuthRefresh, setAuthLoginFailure};

