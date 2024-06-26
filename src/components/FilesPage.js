import '../styles/App.scss';
import React, {useCallback, useEffect, useState} from "react";
import {useAuthContext} from "./useAuth";
import {ImExit} from "react-icons/im";
import {getEnv} from "./getEnv";
import {useNavigate} from "react-router-dom";
import FilesTable from "./FilesTable";

function FilesPage() {
    const [files, setFiles] = useState([]);
    const {token} = useAuthContext();
    const navigate = useNavigate();

    const fetchFiles = useCallback(() =>
        fetch(getEnv('API_URL') + '/files', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then((response) => response.json())
            .then(
                (data) => {
                    data.hasOwnProperty('files') && setFiles(data.files);
                },
                (error) => {
                }
            ), [token]);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

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
            <div className="files-page">
                <h1 className="header-name">CV Manzari</h1>
                <div className="title-bar">
                    <h2 className="header-title">Manage Files</h2>
                    {leaveButton()}
                </div>
                <h2 className="header-title">Edit Files</h2>
                <FilesTable fetchFiles={fetchFiles} files={files}/>
            </div>
        </div>
    );
}


export default FilesPage;