import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@dtap/ui-scl';
const AUTH_VERSION = 2;

function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || '';
}

function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || '';
}

function clearToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    return true;
}

function setToken(accessToken: string, refreshToken: string) {
    if (accessToken && refreshToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        return true;
    }
    return false
}
export default getRefreshToken
export { AUTH_VERSION, getAccessToken, getRefreshToken, clearToken, setToken };

