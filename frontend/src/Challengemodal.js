import React from "react";
import "./ChallengeModal.css";

function ChallengeModal({closeModal}){

    return (
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="titleCloseBtn">
                <button onClick={() => {closeModal(false);}}>
                    X
                </button>
            </div>
            <div className="title">
                <h2>닉네임님의 총 공부시간</h2>
                <h1>00:00:00</h1>
            </div>
            <div className="body">
                <h4>공부일기를 작성하시겠어요?</h4>
            </div>
            <div className="footer">
                <button id="cancelBtn">작성하기</button>
                <button>메인으로</button>
            </div>
        </div>
    </div>
    );
}


export default ChallengeModal