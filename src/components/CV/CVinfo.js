import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import Iframe from 'react-iframe'
function CVinfo() {
    let { userID } = useParams();
    const [CVInfo, setCVInfo] = useState({});
    const [token, setToken] = useState("");

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setToken(token);
        }
        axios.get(`https://localhost:44353/api/cv/cvinfo`, {
            params: { userid: userID },
        })
            .then(res => {
                setCVInfo(res.data);
                console.log(res.data)
            }
            )
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="container d-flex justify-content-center mt-5">
            <Iframe
                src={`https://localhost:44353/cvmanager/mainCVdetail/${CVInfo.id}`}
                width="795px"
                height="900px"
                display="initial"
                position="relative"
            />
        </div>
    )
}

export default CVinfo
