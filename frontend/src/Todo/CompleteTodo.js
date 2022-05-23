import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RoomNumContext, SetMemberContext, ClientContext } from './TodoStudyRoom.js';
import { getNickName } from '../jwtCheck.js';
import Swal from 'sweetalert2';

let Wrapper = styled.div`
    h2 {
        text-align: center;
    }
    button {
        margin: 1rem;
    }
`;

function CompleteTodo({ task }) {

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
                    message: ''
                })
            });
            setIsMember(false);
            Swal.fire({
                confirmButtonColor: '#2fbe9f',

                confirmButtonText: '확인',
                html: '퇴장하셨습니다.<br>다음에 또 같이 공부해요!😊', // Alert 제목 

            }).then((re) => {
                if (re.isConfirmed) {
                    navigate("/");
                }
            });

        } catch (err) {
            console.log(err.message);
            Swal.fire({
                confirmButtonColor: '#2fbe9f',

                confirmButtonText: '확인',
                html: '퇴장에 실패하셨습니다!😢', // Alert 제목 

            });
        }
    }

    return (
        <Wrapper>
            {
                task == 'complete'
                    ? <div><h2>축하합니다!</h2><h3>오늘의 할일을 성공적으로 끝내셨습니다🎉</h3></div>
                    : null
            }
            <h3>공부일기를 작성하시겠어요?</h3>
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