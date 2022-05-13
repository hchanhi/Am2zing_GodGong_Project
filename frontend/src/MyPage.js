import React from "react";
import { getNickName } from './jwtCheck';

function MyPage() {
    
    const token = JSON.parse(localStorage.getItem('accessToken'));

    return (
        <div>
            <h3>{getNickName(token)}님의 마이페이지💁🏻‍♀️</h3>
        </div>
    );
}

export default MyPage;
