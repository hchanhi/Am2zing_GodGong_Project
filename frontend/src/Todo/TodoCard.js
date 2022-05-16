import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid } from "@mui/material";

let Wrapper = styled.div`
    background-color: white;
    margin: 10px;
    padding: 10px;
    text-align: left;
`

function TodoCard({ studyRoom }) {

    let navigate = useNavigate();
    let roomCreatedDate = studyRoom.roomCreated.substr(0, 4)
        + '.' + studyRoom.roomCreated.substr(5, 2)
        + '.' + studyRoom.roomCreated.substr(8, 2)

    return (
        <Grid item xs={3} onClick={() => {
            navigate("/todoStudy/" + studyRoom.roomId);
            
        }}>
            <Wrapper>
                <h4>{studyRoom.roomTitle}</h4>
                0/6 <br />
                카테고리 : {studyRoom.roomCategory}<br/>
                {roomCreatedDate} ~
            </Wrapper>
        </Grid>
    );
}

export default TodoCard;