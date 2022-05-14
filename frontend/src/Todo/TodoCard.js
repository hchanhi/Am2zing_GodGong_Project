import React from "react";
import { useNavigate } from "react-router-dom";

function TodoCard({ studyRoom }) {

    let navigate  = useNavigate();

    return (
        <div onClick={() => {
            navigate("/todoStudy/" + studyRoom.roomNumber);
        }}>
            <h4>{studyRoom.roomTitle}</h4>
            인원 : 0/6 <br />
            <p>카테고리 : {studyRoom.roomCategory}</p>
            방장: {studyRoom.userNickname}
            <hr/>
        </div>
    );
}

export default TodoCard;