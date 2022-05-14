import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './Header.js';
import Home from './Home.js';
import Challenge from './Challenge.js';
import Login from './Login.js';
import Join from './Join.js';
import MyPage from './MyPage.js';
import Diary from './Diary.js';
import DiaryList from './DiaryList.js';
import TodoList from './Todo/TodoList.js';
import TodoStudy from './Todo/TodoStudy.js';
import Footer from './Footer.js';
import { isAuth, getNickName } from './jwtCheck.js';

function App() {

    let [userNickName, setUserNickName] = useState('');
    // isLogin : Header 리렌더링을 위한 state
    let [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('accessToken'));

        if (isAuth(token)) {
            setUserNickName(getNickName(token));
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [isLogin]);

    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data;

    // const getUserInfo = () => {
    //     return axios.get(API_URL + "user", { headers: authHeader() });
    // };

    // const isAdmin = () => {
    //     return axios.get(API_URL + "admin", { headers: authHeader() });
    // };

    return (
        <div className="App">
            <Header userNickName={userNickName} setUserNickName={setUserNickName} />
      
            <Routes>
                <Route exact path="" element={<Home />} />
                <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />} />
                <Route path="/Join" element={<Join />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/mypage/diary" element={<DiaryList />} />
                <Route path="/challenge" element={<Challenge />} />
                <Route path="/diary" element={<Diary />} />
                <Route path="/todoList" element={<TodoList />} />

                <Route path="/todoStudy/:id" element={<TodoStudy />} />

            </Routes>

            <Footer />
        </div>
    );
}

export default App;