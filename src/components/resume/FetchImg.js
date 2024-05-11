import React, {useCallback, useEffect, useState} from "react";
import {useAuthContext} from "../useAuth";

export default function FetchImg(props) {
    const [img, setImg] = useState('');
    const {token} = useAuthContext();
    const filename = props.filename;

    const fetchImage = useCallback(() =>
        fetch(process.env.REACT_APP_API_URL + '/file/' + filename, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then((response) => response.blob())
            .then((imageBlob) => URL.createObjectURL(imageBlob))
            .then((imageObjectURL) => setImg(imageObjectURL))
    , [token, filename]);

    useEffect(() => {
        fetchImage();
    }, [fetchImage]);

    return (
        <>
            <img className={props.className} src={img} alt={props.filename}/>
        </>
    );
}