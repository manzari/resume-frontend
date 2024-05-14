import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {getSHA256Hash} from "./getHash";
import {getEnv} from "./getEnv";

const authContext = React.createContext();
const storageKey = 'ResumeToken';

function useAuth() {
    const [token, setToken] = useState(window.localStorage.getItem(storageKey));
    const [lastLoginStatus, setLastLoginStatus] = useState('unsubmitted');

    const isTokenValid = useCallback(() => {
        if (token === null) {
            return false;
        }
        let decoded = jwtDecode(token);
        let now = Math.floor(Date.now() / 1000)
        return (decoded.iat <= now && decoded.exp > now);
    }, [token]);

    useEffect(() => {
        const data = window.localStorage.getItem(storageKey);
        if (data !== null) setToken(data);
    }, []);

    useEffect(() => {
        if (isTokenValid()) {
            window.localStorage.setItem(storageKey, token);
        }
    }, [isTokenValid, token]);


    async function performLoginRequest(username, otp) {
        return fetch(getEnv('API_URL') + '/login', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: otp
            })
        }).then(
            (response) => {
                if (response.status === 200) {
                    return response.json().then((data) => {
                        setToken(data.token)
                        return true;
                    })
                } else {
                    setToken(null);
                }
                return false;
            }
        )
    }

    return {
        token,
        isTokenValid,
        lastLoginStatus,
        getRole() {
            if (token === null) {
                return null;
            }
            let decoded = jwtDecode(token);
            return decoded.hasOwnProperty('role') ? decoded.role : null;

        },
        login(otp) {
            return new Promise((resolve, reject) => {
                getSHA256Hash(otp).then((username) => {
                    performLoginRequest(username, otp).then(
                        (success) => {
                            setLastLoginStatus(success ? 'success' : 'failure')
                            resolve(success)
                        }
                    );
                });
            });
        },
        adminLogin(username, password) {
            return new Promise((resolve, reject) => {
                performLoginRequest(username, password).then(
                    (success) => {
                        setLastLoginStatus(success ? 'success' : 'failure')
                        resolve(success)
                    })
                ;
            });
        },
        logout() {
            window.localStorage.removeItem(storageKey);
            setToken(null);
        },
    };
}

export function AuthProvider({children}) {
    const auth = useAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuthContext = () => React.useContext(authContext);