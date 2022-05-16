import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { isAuth, getNickName } from './jwtCheck';
function MyPage(props) {

    let navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('accessToken'));

    if (!isAuth(token)) {
        alert('로그인 후 이용하실 수 있어요😥');
        return navigate('/login');
    }

    return (
        <div>
            <h3>{getNickName(token)}님의 마이페이지💁🏻‍♀️</h3>
            <Link to="/mypage/studylog">
            <h3>공부시간</h3>
            </Link>
            <Link to="/mypage/todo">
            <h3>투두리스트</h3>
            </Link>
            <Link to="/mypage/diary">
                <h3>공부일기 목록</h3>
            </Link>
            <Link to="/mypage/user">
            <h3>회원정보 수정</h3>
            </Link>
        </div>
    );
}

export default MyPage;
