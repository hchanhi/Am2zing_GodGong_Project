import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DiaryList from './DiaryList.js';
import TimeCalendar from './TimeCalendar.js';
import User from './user.js';
import { isAuth, getNickName } from './jwtCheck';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import MyTodos from "./MyTodos.js";

function MyPage(props) {

    let navigate = useNavigate();
    let token = JSON.parse(localStorage.getItem('accessToken'));
    let [menu, setMenu] = useState(0);
  
    let handleChange = (event, newValue) => {
        setMenu(newValue);
    };

    if (!isAuth(token)) {
        alert('로그인 후 이용하실 수 있어요😥');
        return navigate('/login');
    }

    return (
        <div>
            <h3>{getNickName(token)}님의 마이페이지💁🏻‍♀️</h3>
                <Tabs value={menu} onChange={handleChange} centered={true}>
                <Tab icon={<TimelapseIcon />} label="공부시간" />
                <Tab icon={<ListAltIcon />} label="Todo List" />
                <Tab icon={<BorderColorRoundedIcon />} label="공부일기" />
                <Tab icon={<PersonSearchRoundedIcon />} label="회원정보 수정" />
            </Tabs>
            {menu == 0
                ? <TimeCalendar />
                : menu == 1
                    ? <MyTodos />
                    : menu == 2
                        ? <DiaryList />
                        : <User setUserNickName={props.setUserNickName} />}
        </div>
    );
}

export default MyPage;
