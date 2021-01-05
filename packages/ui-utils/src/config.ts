import {IAuthenProvider, IConfig, IInitConfig} from '@dtap/ui-scl';

const CONFIG: IConfig = {
    APP_NAME: '',
    APP_VERSION: '',
    APP_URL: '',
    API_URI: '',
    OAUTH_FREFIX: '',
    CLIENT_SECRET: '',
    CLIENT_ID: '',
}

let AUTHENTICATION: IAuthenProvider = {
    doLogin: null,
    doRefresh: null,
    doLogout: null,
    getResourceAccess: null,
    getUserInfo: null,
    checkToken: null,
    getI18n: null
}

function initConfigApp(props: IInitConfig): void {
    const {
        appName, appVersion, appURL, apiURL, oauthFrefix,
        clientSecret, clienId,
    } = props;
    CONFIG.APP_NAME = appName || '';
    CONFIG.APP_VERSION = appVersion || '';
    CONFIG.APP_URL = appURL || '';
    CONFIG.API_URI = apiURL || '';
    CONFIG.OAUTH_FREFIX = oauthFrefix || '';
    CONFIG.CLIENT_SECRET = clientSecret || '';
    CONFIG.CLIENT_ID = clienId || '';
}
const setAuthenProvider = (auth: IAuthenProvider): void => {
    AUTHENTICATION = auth
}
const getAuthenProvider = (): IAuthenProvider => {
    return AUTHENTICATION;
}

function getConfig(): IConfig {
    return CONFIG
}

function getAppName(): string {
    return String(CONFIG.APP_NAME)
}
function getAppVersion(): string {
    return String(CONFIG.APP_VERSION)
}

function getAppURL(): string {
    if (process.env['NODE_ENV'] !== 'production') {
        return String(window.location.origin);
    }
    return String(CONFIG.APP_URL)
}

function getApiURI(): string {
    return String(CONFIG.API_URI)
}

function getApiOauthFrefix(): string {
    return String(CONFIG.OAUTH_FREFIX)
}

function getClientSecret(): string {
    return String(CONFIG.CLIENT_SECRET)
}


function getClienId(): string {
    return String(CONFIG.CLIENT_ID)
}


const config = {initConfigApp, getClientSecret, getClienId, setAuthenProvider, getConfig, getAuthenProvider, getAppName, getAppVersion, getAppURL, getApiURI, getApiOauthFrefix}

export default config;
export {config};

