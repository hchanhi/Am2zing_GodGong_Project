
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import React, { useState, createContext } from "react";


function DiaryCom({ diaryId, diaryContent, diarySentiment, diaryCreated, handleSubmit }) {

    let navigate = useNavigate();
    function move() {
        navigate(`/mypage/diaryDetail/${diaryId}/${diaryContent}`);
    }


    return <div>

        <div >

            <h2>{diaryId}</h2>
            <h5>{diaryCreated}</h5>
            <br></br>
            <h5 >
                {diaryContent}

            </h5>
            <br></br>
            {diarySentiment === 'neutral' ?
                <h5 >감정분석결과  : 기분이 보통입니다. 😐</h5> :
                diarySentiment === 'negative' ?
                    <h5 >감정분석결과 : 기분이 나쁩니다. 👿</h5>
                    : <h5 >감정분석결과 : 기분이 좋습니다. 🥰</h5>
            }
            <button type="submit" onClick={() => move()} >수정</button>
            <button type="submit" onClick={() => handleSubmit(diaryId)}>삭제</button>
            <br></br>
            <hr></hr>
            <br></br>



        </div>
    </div >;
}

DiaryCom.propTypes = {
    diaryId: PropTypes.number.isRequired,
    diaryContent: PropTypes.string.isRequired,
    diarySentiment: PropTypes.string.isRequired,
    diaryCreated: PropTypes.string.isRequired,


};
// <Link to={`/Movie/${diaryId}`}>
export default DiaryCom;;