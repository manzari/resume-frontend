import '../styles/App.scss';
import React, {useCallback, useEffect, useState} from "react";
import UsersTable from "./UsersTable";
import {useAuthContext} from "./useAuth";
import {ImExit} from "react-icons/im";
import {useNavigate} from "react-router-dom";
import OtpInput from "react-otp-input";
import {getSHA256Hash} from "./getHash";
import {getEnv} from "./getEnv";

function UsersPage() {
    const [users, setUsers] = useState([{id: 1, name: "test", actions: "delete"}]);
    const otpLength = 6;
    const [otp, setOtp] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setAdmin] = useState(false);
    const {token} = useAuthContext();
    const navigate = useNavigate();

    const fetchUsersData = useCallback(() =>
        fetch(getEnv('API_URL') + '/users', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            }), [token]);


    function handleRegisterButton() {
        if (isAdmin) {
            registerUser({
                name: name,
                username: username,
                password: password,
                role: "ADMIN"
            })
        } else {
            getSHA256Hash(otp).then((hash) => registerUser(
                {
                    name: name,
                    username: hash,
                    password: otp,
                    role: "USER"
                }
            ))
        }
    }

    function registerUser(userData) {
        setMessage('Registering...')
        fetch(getEnv('API_URL') + '/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.hasOwnProperty('message')) {
                    setMessage('Backend: ' + data.message)
                }
                fetchUsersData();
            })
            .catch((reason) => {
                    setMessage('Something went wrong: ' + reason);
                }
            );
    }

    useEffect(() => {
        fetchUsersData();
    }, [fetchUsersData]);

    const leaveButton = () =>
        <ul className="icon-links">
            <li className="icon-link-item" key={'icon-exit'} onClick={() => navigate('/resume')}>
                <a className="icon-link">
                    <ImExit/>
                </a>
            </li>
        </ul>

    return (
        <div className="wrapper">
            <header className="login-page no-print">
                <h1 className="header-name no-print">CV Manzari</h1>
                <div className="title-bar no-print">
                    <h2 className="header-title">Manage Users</h2>
                    {leaveButton()}
                </div>
                <h2 className="header-title">Add User</h2>
                <div className="login-page">
                    <label>Name</label>
                    <input className={"register-field no-print"}
                           type="text"
                           value={name}
                           onChange={(e) => setName(e.target.value)}/>
                    <label>IsAdmin</label>
                    <input className={"register-field no-print"}
                           type="checkbox"
                           checked={isAdmin}
                           onChange={(e) => setAdmin(!isAdmin)}/>
                    {isAdmin ? <>
                        <label>Username</label>
                        <input className={"register-field no-print"}
                               type="text"
                               value={username}
                               disabled={!isAdmin}
                               onChange={(e) => setUsername(e.target.value)}/>
                        <label>Password</label>
                        <input
                            className={"register-field no-print"}
                            type="password"
                            value={password}
                            disabled={!isAdmin}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </> : null}
                    {!isAdmin ? <>
                        <label>OTP</label>
                        <OtpInput
                            value={otp}
                            onChange={(change) => setOtp(change.toUpperCase())}
                            numInputs={otpLength}
                            shouldAutoFocus={true}
                            inputStyle={"register-otp-field no-print"}
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
                    </> : null}
                    <button onClick={handleRegisterButton}>Register</button>
                    <p>{message}</p>
                </div>
                <h2 className="header-title">Edit Users</h2>
                <UsersTable fetchUsersData={fetchUsersData} users={users}/>
            </header>
        </div>
    );
}


export default UsersPage;