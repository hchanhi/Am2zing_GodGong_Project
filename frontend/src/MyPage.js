import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styled from "styled-components";
import DiaryList from "./DiaryList";
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
