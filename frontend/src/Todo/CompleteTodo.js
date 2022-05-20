import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RoomNumContext, SetMemberContext, ClientContext } from './TodoStudyRoom.js';
import { getNickName } from '../jwtCheck.js';

let Wrapper = styled.div`
    button {
        margin: 1rem;
    }
`

function CompleteTodo({task}) {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);
    let client = useContext(ClientContext);
    let roomNum = useContext(RoomNumContext);
    let setIsMember = useContext(SetMemberContext);
    const navigate = useNavigate();

    function exitStudy() {
        try {
            client.publish({
                destination: '/pub/chat/exit',
                body: JSON.stringify({
                    roomNumber: roomNum,
                    userNickname: userNickname,
                    result: ''
                })
            });
            setIsMember(false);
        } catch (err) {
            console.log(err.message);
        }
        navigate("/");
    }

    return (
        <Wrapper>
            {
                task == 'complete'
                    ? <h2>축하합니다! 오늘의 할일을 성공적으로 끝내셨습니다🎉</h2>
                    : null
            }
            <div>공부일기를 작성하시겠어요?</div>
            <Button
                variant="contained"
                style={{ backgroundColor: 'dodgerblue' }}
                onClick={() => navigate("/diary")}>
                작성하기
            </Button>
            <Button
                variant="contained"
                style={{ backgroundColor: 'red' }}
                onClick={() => exitStudy()}>
                퇴장하기
            </Button>
        </Wrapper>
    );
}

export default CompleteTodo;