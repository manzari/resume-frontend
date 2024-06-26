import React, {useState} from "react";
import ReactJson from "react-json-view";
import {useAuthContext} from "./useAuth";
import {useNavigate} from "react-router-dom";
import {getEnv} from "./getEnv";

function AdminPanel(props) {
    const [saveButtonText, setSaveButtonText] = useState('Save');
    const {token} = useAuthContext();
    const navigate = useNavigate();

    function patchResumeData() {
        setSaveButtonText("Saving...")
        fetch(getEnv('API_URL') + '/resume/' + props.resumeData.id, {
            method: 'PATCH',
            body: JSON.stringify(props.resumeData),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                props.setResumeData(data)
                setSaveButtonText('Saved')
            });
    }

    function handleChange(interactionProps) {
        setSaveButtonText('Save')
        props.setResumeData(interactionProps.updated_src)
    }

    async function handlePaste() {
        let clipboard = await window.navigator.clipboard.readText();
        props.setResumeData(JSON.parse(clipboard))
    }

    return (
        <>
            <div className='admin-toolbar'>
                <button
                    onClick={patchResumeData}
                    className={'admin-toolbar-button'}>
                    {saveButtonText}
                </button>
                <button
                    onClick={handlePaste}
                    className={'admin-toolbar-button'}>
                    Paste Clipboard
                </button>
                <button
                    onClick={() => navigate('/users')}
                    className={'admin-toolbar-button'}>
                    Manage Users
                </button>
                <button
                    onClick={() => navigate('/files')}
                    className={'admin-toolbar-button'}>
                    Manage Files
                </button>
                <button
                    className={'admin-toolbar-button'}
                    onClick={props.toggleAdminPanel}>
                    Close
                </button>
            </div>
            <ReactJson
                src={props.resumeData}
                onEdit={handleChange}
                onAdd={handleChange}
                onDelete={handleChange}
            />
        </>
    )
}

export default AdminPanel;
