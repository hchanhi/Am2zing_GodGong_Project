import axios from "axios";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function FindPw() {

    const navigate = useNavigate();
    let { key } = useParams();

    useEffect(() => {
        axios.get('/user/password/' + key)
            .then(res => {
                if (res.success == true)
                    alert(res.message);
                else if (res.message == '유효하지 않은 Key값입니다.')
                    alert('잘못된 접근입니다.');
                return navigate('/login');
            })
            .catch(err => {
                console.log(err);
            })
    }, [key]);
    
    return (
        <div>
            왜 json만 나와아악
        </div>
    )
}

export default FindPw;

