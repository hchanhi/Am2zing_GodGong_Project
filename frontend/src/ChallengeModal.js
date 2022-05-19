import React from "react";
import {useNavigate } from "react-router-dom";
import {getNickName } from './jwtCheck';
import "./ChallengeModal.css";

function ChallengeModal(props){

    let navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('accessToken'));

    function test(data){
        var h = parseInt(data/3600);
        var m = parseInt((data%3600)/60);
        var s = (data%3600)%60;
        var time = h+"시간 "+m+"분 "+s+"초";
        return time;
    }

    return (
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="titleCloseBtn">
                <button onClick={() => {props.closeModal(false);}}>
                    X
                </button>
            </div>
            <div className="title">
                <h2>{getNickName(token)} 님의 총 공부시간</h2>
                <h3>{test(props.timedata)}</h3>
            </div>
            <div className="body">
                <h4>공부일기를 작성하시겠어요?</h4>
                
            </div>
            <div className="footer">
                <button id="cancelBtn" onClick={() => navigate("/Diary")}>작성하기</button>
                <button onClick={() => navigate("/")}>메인으로</button>
            </div>
        </div>
    </div>
    );
}


export default ChallengeModal