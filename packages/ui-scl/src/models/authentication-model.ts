export interface IUserInfo {
  display_name: string;
  email: string;
  username: string;
  first_login: boolean;
  reset_password: boolean;
  is_cloud: boolean;
}

export interface IRouter {
  auth: string;
  exact: boolean
  name: string;
  path?: string;
  component?: React.Component | any;
}

export interface IAuthenticationState {
  routers: IRouter[];
  loading: number;
  isAuthenticatedStatusCode: number | null;
  isAuthenticated: boolean;
  isCheckToken: boolean;
  userInfo: IUserInfo;
  authenProvider: IAuthenProvider;
  openSigninExpirationTime: boolean;
}

export interface IAuthenProviderOutPut {
  status: number;
  statusText?: string;
  body?: any;
}

export interface IUserInfoOutPut {
  userInfo?: IUserInfo;
  status: number;
  statusText?: string;
  body?: any;
}

export interface IDoLoginOutPut {
  status: number;
  statusText?: string;
  body?: any;
  access_token?: string;
  refresh_token?: string;
}

export type IDoLogin = (username: string, password: string) => Promise<IDoLoginOutPut>;
export type IDoRefresh = (refreshToken: string) => Promise<IDoLoginOutPut>;
export type IDoLogout = () => Promise<IAuthenProviderOutPut>;
export type IGetResourceAccess = () => Promise<IAuthenProviderOutPut>;
export type IGetUserInfo = (accessToken: string) => Promise<IUserInfoOutPut>;
export type ICheckToken = (accessToken: string) => Promise<IDoLoginOutPut>;
export type IGetI18n = () => Promise<IAuthenProviderOutPut>;

export interface IAuthenProvider {
  doLogin: IDoLogin | null;
  doRefresh: IDoRefresh | null;
  doLogout: IDoLogout | null;
  getResourceAccess: IGetResourceAccess | null;
  getUserInfo: IGetUserInfo | null;
  checkToken: ICheckToken | null;
  getI18n: IGetI18n | null;
}
