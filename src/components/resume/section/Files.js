import React from 'react';
import {getEnv} from "../../getEnv";
import {useAuthContext} from "../../useAuth";
import {FaRegFileAlt} from "react-icons/fa";

function Files(props) {
    const {token} = useAuthContext();
    const openFile = async (filename) => {
        try {
            const response = await fetch(getEnv('API_URL') + '/file/' + filename, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + token
                },
            });

            if (!response.ok) {
                console.error('Network Issue: ', response.statusCode);
                return
            }

            const blob = await response.blob();

            const url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
            const a = document.createElement('a');
            a.href = url
            a.download = filename;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the PDF', error);
        }
    }
    return (
        <div key={props.kkey + 'files'}>
            {props.files.map((file, index) => {
                return <p
                    onClick={() => openFile(file.file)}
                    key={props.kkey + 'files-' + index}
                    className={'resume-item-file'}
                ><FaRegFileAlt/> {file.title}</p>
            })}
        </div>
    );
}

export default Files;
