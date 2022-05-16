import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid } from "@mui/material";

let Wrapper = styled.div`
    background-color: white;
    box-shadow: 5px 5px 5px rgb(226, 233, 230);
    margin: 10px;
    padding: 1.5rem;
    text-align: left;
    cursor: pointer;
    border-radius: 2rem;
    // border: solid 8px black;
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
                <h2>{studyRoom.roomTitle}</h2>
                 {studyRoom.roomCategory} <br />
                {roomCreatedDate} ~ <br />
                <h3 style={{textAlign: 'right', color: 'orangered'}}>5/6</h3>
            </Wrapper>
        </Grid>
    );
}

export default TodoCard;