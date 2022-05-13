import React from "react";
import { useNavigate, Route } from "react-router-dom";
import { isAuth } from './jwtCheck';

function PrivateRoute() {

    let navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('accessToken'));

    alert('로그인 후 이용하실 수 있어요😥');

    return (
        <div>
            
        </div>
    )
}

export default PrivateRoute;
