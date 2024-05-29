import React, {useCallback, useEffect, useState} from "react";
import OtpInput from 'react-otp-input';
import {useNavigate, useParams} from "react-router-dom";
import {useAuthContext} from "./useAuth";

function LoginPage() {
    const otpLength = 6;
    const [otp, setOtp] = useState('');
    const {urlOtp} = useParams();
    const {login, lastLoginStatus} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const otpRegex = /[A-z0-9]{3}-[A-z0-9]{3}/;
        let matches = otpRegex.exec(urlOtp)

        if (matches !== null) {
            let passedOtp = matches[0].replace('-', '');
            if (passedOtp !== null && passedOtp.length === otpLength) {
                setOtp(passedOtp.toUpperCase())
            }
        }
    }, [urlOtp]);

    const performLogin = useCallback(() => {
        login(otp).then((success) => success && navigate('/resume'))
    }, [otp, login, navigate]);

    useEffect(() => {
        if (otp.length === otpLength) {
            performLogin()
        }
    }, [otp, performLogin]);

    return (
        <div className="wrapper">
            <header className="login-page">
                <h1 className="header-name">CV Manzari</h1>
                <div className="title-bar no-print">
                    <h2 className="header-title">Login to view</h2>
                </div>
                <div className="summary">
                    <p>To view this CV you have been assigned a short password. Please enter it here or ask me for a
                        magic link to it.</p>
                </div>
                <div className={"login-box no-print"}>
                    <OtpInput
                        value={otp}
                        onChange={value => setOtp(value.toUpperCase())}
                        numInputs={otpLength}
                        shouldAutoFocus={true}
                        inputStyle={"otp-field no-print otp-status-" + lastLoginStatus}
                        renderSeparator={(index) => {
                            if ((index + 1) === otpLength / 2) {
                                return <p className="otp-separator">-</p>;
                            }
                        }}
                        renderInput={
                            (props) => {
                                return <input {...props}/>
                            }
                        }
                    />
                    {lastLoginStatus === 'failure' &&
                        <p className="login-warning">Could not authenticate with this OTP</p>}
                </div>
                <button disabled={(otp.length < otpLength)} className="login-button no-print" onClick={performLogin}>
                    {lastLoginStatus === 'failure' ? "Retry" : "Login"}
                </button>
                <a href="mailto:contact@manzari.dev?subject=Request to access your CV&body=Hello, please send me a magic link."
                   className="request-button no-print">Request a link</a>
            </header>
        </div>
    );
}

export default LoginPage;
