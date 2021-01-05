export interface IProvider {
    readonly state: object | any;
    readonly actions?: object | any;
}
export interface IResponse {
    status: number;
    data: any;
    headers?: any;
    response?: any;
    blod?: any;
}
export interface IProviderOutPut {
    uri: string;
    type?: 'json' | 'file';
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    body?: null | any;
    response?: IResponse | any;
    ignoreToken?: boolean;
}
export type IResourceProvider = (input: IInputProvider) => IProviderOutPut;

export interface IResourceRegistries {
    [key: string]: IResourceProvider;
}

export interface IConfig {
    APP_NAME?: string;
    APP_VERSION?: string;
    APP_URL?: string;
    API_URI?: string;
    OAUTH_FREFIX?: string;
    CLIENT_SECRET?: string;
    CLIENT_ID?: string;
}

export interface IInitConfig {
    appName?: string;
    appVersion?: string;
    appURL?: string;
    apiURL?: string;
    oauthFrefix?: string;
    clientSecret?: string;
    clienId?: string;
}
export interface IInputProvider {
    typeRequest: string;
    typeApi: {
        get: '@DGS/DATA_FETCH/GET',
        create: '@DGS/DATA_FETCH/CREATE',
        update: '@DGS/DATA_FETCH/UPDATE',
        delete: '@DGS/DATA_FETCH/DELETE'
    }
    apiURI: IConfig;
    resource: string;
    params: any;
}

export interface ICurrentUser {
    username: string;
    displayName: string;
    email: string;
}

export class CurrentUserEntity implements ICurrentUser {
    displayName: string;
    email: string;
    username: string;

    constructor(props?: ICurrentUser) {
        if (props) {
            this.username = props.username;
            this.displayName = props.displayName;
            this.email = props.email;
        } else {
            this.username = '';
            this.displayName = '';
            this.email = '';
        }
    }
}
