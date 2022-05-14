import React from "react";
import { Link } from "react-router-dom";

import { getNickName } from './jwtCheck';
function MyPage(props) {

    const token = JSON.parse(localStorage.getItem('accessToken'));

    return (
        <div>
            <h3>{getNickName(token)}님의 마이페이지💁🏻‍♀️</h3>
            <h3>공부시간</h3>
            <h3>투두리스트</h3>
            <Link to="/mypage/diary">
                <h3>공부일기 목록</h3>
            </Link>
            <h3>회원정보 수정</h3>
        </div>
    );
}

export default MyPage;
