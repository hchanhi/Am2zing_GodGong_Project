import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuth, getNickName } from './jwtCheck';
import "./ChallengeModal.css";

function ChallengeModal({closeModal}){

    let navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('accessToken'));

    return (
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="titleCloseBtn">
                <button onClick={() => {closeModal(false);}}>
                    X
                </button>
            </div>
            <div className="title">
                <h2>{getNickName(token)} 님의 총 공부시간</h2>
                <h1>00:00:00</h1>
            </div>
            <div className="body">
                <h4>공부일기를 작성하시겠어요?</h4>
            </div>
            <div className="footer">
                <button id="cancelBtn" onClick={() => navigate("/Diary")}>작성하기</button>
                <button onClick={() => navigate("/App")}>메인으로</button>
            </div>
        </div>
    </div>
    );
}


export default ChallengeModal