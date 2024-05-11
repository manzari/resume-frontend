import '../styles/App.scss';
import React, {useCallback, useEffect, useState} from "react";
import {useAuthContext} from "./useAuth";
import {ImExit} from "react-icons/im";
import {getEnv} from "./getEnv";
import {useNavigate} from "react-router-dom";
import FilesTable from "./FilesTable";

function FilesPage() {
    const [fileToUpload, setFileToUpload] = useState();
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
                () => {
                }
            ), [token]);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    const leaveButton = () =>
        <ul className="icon-links">
            <li className="icon-link-item" key={'icon-exit'} onClick={() => navigate('/resume')}>
                <a href="#" className="icon-link">
                    <ImExit/>
                </a>
            </li>
        </ul>

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFileToUpload(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (!fileToUpload) {
            return;
        }
        const formData = new FormData();
        formData.append("file", fileToUpload);
        fetch(getEnv('API_URL') + '/file/' + cleanFilename(fileToUpload.name), {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: "Bearer " + token
            },
        })
            .then(() => fetchFiles())
            .then((res) => res.json())
            .catch((err) => console.error(err));
    };

    const cleanFilename = (filename) => {
        return filename.replace(/[^a-zA-Z0-9.]/g, '');
    }

    return (
        <div className="wrapper">
            <div className="files-page">
                <h1 className="header-name">CV Manzari</h1>
                <div className="title-bar">
                    <h2 className="header-title">Manage Files</h2>
                    {leaveButton()}
                </div>
                <h2 className="header-title">Upload Files</h2>
                <div style={{marginLeft: '2rem'}}>
                    <input type="file" onChange={handleFileChange}/>
                    {
                        fileToUpload
                            ? <>
                                <p>Storing as: {cleanFilename(fileToUpload.name)}</p>
                                <p>Size: {fileToUpload.size}</p>
                                <p>Type: {fileToUpload.type}</p>
                            </>
                            : ''
                    }
                    <button onClick={handleUploadClick}>Upload</button>
                </div>
                <h2 className="header-title">Edit Files</h2>
                <FilesTable fetchFiles={fetchFiles} files={files}/>
            </div>
        </div>
    );
}


export default FilesPage;