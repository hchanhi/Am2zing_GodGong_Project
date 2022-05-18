import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import SockJs from "sockjs-client";
import { getNickName } from '../jwtCheck.js';
import { RoomNumContext, NewMessageContext, ClientContext } from './TodoStudy.js'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

let Receive = styled.div`
    height: 78vh;
    width: 100%
`
let Send = styled.div`
    height: 15vh;
    padding: 0.5rem;
    border-top: 1px solid lightgray;
`
let Text = styled.textarea`
    width: 100%;
    height: 80%;
    margin-top: 3px;
    padding: 10px;
    background-color: #e9e7e7;
    border: none;
    outline: none;
    font-family: 'Pretendard-Medium';
    font-size: 11pt;
`

function Chatting() {

    let token = JSON.parse(localStorage.getItem('accessToken'));
    let userNickname = getNickName(token);
    let roomNum = useContext(RoomNumContext);
    let newMessage = useContext(NewMessageContext);
    let client = useContext(ClientContext);

    function sendMessage(myMessage) {
        try {
            if (myMessage == '\n') return alert('채팅을 입력하세요!');
            client.publish({
                destination: '/pub/chat/message',
                body: JSON.stringify({
                    roomNumber: roomNum,
                    userNickname: userNickname,
                    message: myMessage
                })
            });
        } catch(err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            <Receive>
                {
                    newMessage && newMessage.map(chat => (
                        <div key={chat.message}>
                            <div>{chat.userNickname}</div>
                            <div>{chat.message}</div>
                        </div>
                    ))
                }
            </Receive>
            <Send>
                <div>닉네임</div>
                <Text onKeyUp={(e) => {
                    if (e.key == 'Enter') {
                        sendMessage(e.target.value);
                        e.target.value = '';
                    }
                }}></Text>
            </Send>
        </div>
    );
}

export default Chatting;