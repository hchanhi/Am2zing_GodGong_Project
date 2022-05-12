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
import TodoList from './Todo/TodoList.js';
import TodoStudy from './Todo/TodoStudy.js';
import Footer from './Footer.js';
// import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

function App() {

    let [userNickName, setUserNickName] = useState('');
    // isLogin : 리렌더링을 위한 state
    let [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        // 토큰이 없는 경우, 토큰 검증이 성공한 경우(try), 검증이 실패한 경우(catch)

        if (!token) {
            return;
        }

        // let decoded = jwt.decode(token);  // null로 출력
        let decoded = jwt_decode(token);
        setUserNickName(decoded.iss);

        // try {
        //     let verify = jwt.verify(token, process.env.JWT_SECRET);
        //     console.log(verify);
        // } catch (err) {
        //     console.log(err);
        // }
    }, []);

    return (
        <div className="App">
            <Header setIsLogin={setIsLogin} userNickName={userNickName} isLogin={isLogin}/>

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login setUserNickName={setUserNickName} setIsLogin={setIsLogin}/>} />
                <Route path="/Join" element={<Join />} />
                <Route path="/mypage" element={<MyPage userNickName={userNickName}/>} />
                <Route path="/challenge" element={<Challenge userNickName={userNickName} />} />
                <Route path="/diary" element={<Diary userNickName={userNickName} />} />
                <Route path="/todoList" element={<TodoList />} />
                <Route path="/todoStudy/:id" element={<TodoStudy />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;