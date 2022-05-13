import React from "react";
import { useNavigate } from "react-router-dom";

function TodoCard({ dummy }) {

    let navigate  = useNavigate();

    return (
        <div onClick={() => {
            navigate("/todoStudy/" + dummy.id);
        }}>
            <h4>{dummy.title}</h4>
            인원 : {dummy.number}/6 <br />
            <p>{dummy.category}</p>
                {dummy.date}
        </div>
    );
}

export default TodoCard;