
const redirect = (path: string) => {
    if (window) {
        const sub = path.indexOf('/') === 0 ? '' : '/';
        window.location.replace(window.location.origin + sub + path);
        return true;
    }
    return false;
}

const redirectApp = (path: string) => {
    if (window) {
        const sub = path.indexOf('/') === 0 ? '' : '/';
        const nextPath = window.location.origin + sub + (path && path !== '/' ? path + "/" : '')
        if (window.location.href !== nextPath) {
            window.location.replace(nextPath);
        }
        return true;
    }
    return false;
}
export default redirect
export {redirectApp, redirect};

