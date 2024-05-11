export function getEnv(key) {
    if (process.env.NODE_ENV !== 'production') {
        return process.env['REACT_APP_' + key];
    }
    return window.extended['REACT_APP_' + key];
}