import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "./useAuth";

function AdminLoginPage() {
    const {adminLogin, lastLoginStatus} = useAuthContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return (
        <div className="wrapper">
            <header className="login-page">
                <h1 className="header-name">CV Manzari</h1>
                <div className="title-bar no-print">
                    <h2 className="header-title">Administrator login</h2>
                </div>
                <input className={"login-field"}
                       type="text"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className={"login-field"}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {lastLoginStatus === 'failure' &&
                    <p className="login-warning">Could not authenticate with this credentials</p>}
                <button className="login-button no-print" onClick={
                    () => adminLogin(username, password).then(
                        (success) => success && navigate('/resume')
                    )
                }>
                    {lastLoginStatus === 'failure' ? "Retry" : "Login"}
                </button>
            </header>
        </div>
    );
}

export default AdminLoginPage;
