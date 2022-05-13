import React, { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { isAuth } from './jwtCheck';

function PrivateRoute(props) {

    let navigate = useNavigate();
    
    const token = JSON.parse(localStorage.getItem('accessToken'));

    useEffect(() => {
        if (!isAuth(token)) {
            alert('로그인 후 이용하실 수 있어요😥');
            return navigate('/login');
        }
    },[]);

    return (
        <div>
            <Routes>
                <Route path={props.path} element={<props.component />} />
            </Routes>
        </div>
    )
}

export default PrivateRoute;
