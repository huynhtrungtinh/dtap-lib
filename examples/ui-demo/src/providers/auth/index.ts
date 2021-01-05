import { IAuthenProvider, IAuthenProviderOutPut, IDoLoginOutPut, IUserInfo, IUserInfoOutPut, USER_AGENT } from '@dtap/ui-scl';
import { config, fetchJson, parseJwt } from '@dtap/ui-utils';

const authenProvider: IAuthenProvider = {
  doLogin: async (username: string, password: string) => {
    const body = new URLSearchParams();
    body.append("client_id", "elrond");
    body.append("client_secret", "HiEldrond");
    body.append("grant_type", "password");
    body.append("username", username);
    body.append("password", password);
    const response = await fetch(`${config.getApiOauthURI()}/token`, {
      method: "POST",
      headers: new Headers({
        "user-agent": USER_AGENT,
        "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
      }),
      body
    });
    const textIn = await response.text();
    const dataFinal = JSON.parse(textIn);
    let outPut: IDoLoginOutPut = {
      status: 400,
    };
    if (response.status === 200) {
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
    body.append("client_id", "elrond");
    body.append("client_secret", "HiEldrond");
    body.append("grant_type", "refresh_token");
    body.append("refresh_token", refreshToken);
    const response = await fetch(`${config.getApiOauthURI()}/token`, {
      method: "POST",
      headers: new Headers({
        "user-agent": USER_AGENT,
        "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
      }),
      body
    });
    const textIn = await response.text();
    const dataFinal = JSON.parse(textIn);
    let outPut: IDoLoginOutPut = {
      status: 400,
    };
    if (response.status === 200) {
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
      status: 200,
    };
    return outPut;
  },
  getResourceAccess: async () => {
    let outPut: IAuthenProviderOutPut = {
      status: 400,
    };
    return outPut;
  },
  checkToken: async (token: string) => {
    const response = await fetch(`${config.getApiOauthURI()}/check_token`, {
      method: "GET",
      headers: new Headers({
        "user-agent": USER_AGENT,
        "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "authorization": `Bearer ${token}`
      }),
    });
    const textIn = await response.text();
    const dataFinal = JSON.parse(textIn);
    let outPut: IUserInfoOutPut = {
      status: 400,
    };
    if (response.status === 200) {
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
      outPut.body = response.json;
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

export { authenProvider };

