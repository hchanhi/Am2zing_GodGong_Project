import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { getNickName } from '../jwtCheck.js';
import { RoomNumContext, NewMessageContext, ClientContext } from './TodoStudy.js'

let Receive = styled.div`
    height: 75%;
    overflow: auto;
    width: 100%;
    padding: 10px;
`
let Send = styled.div`
    height: 20%;
    padding: 0.7rem;
    border-top: 1px solid lightgray;
`
let Text = styled.textarea`
    width: 100%;
    height: 80%;
    margin: 0;
    padding: 10px;
    background-color: #e9e7e7;
    border: none;
    outline: none;
    font-family: 'Pretendard-Medium';
    font-size: 11pt;
`
let NewText = styled.div`
    background-color: #f0f0f0;
    padding: 5px;
    border-radius: 5px;
    display: inline-block;
`

function Chatting() {

    let token = JSON.parse(localStorage.getItem('accessToken'));
    let userNickname = getNickName(token);
    let roomNum = useContext(RoomNumContext);
    let newMessage = useContext(NewMessageContext);
    let client = useContext(ClientContext);
    let scrollRef = useRef();

    useEffect(() => {
        scrollRef.current.scrollIntoView();
    }, [newMessage]);

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
        <div style={{ height: '100vh' }}>
            <h2 style={{ height: '5%', padding: '10px 10px 12px 10px'}}>📢Chatting</h2>
            <Receive ref={el => { scrollRef = el; }}>
                {
                    newMessage && newMessage.map((chat, index) => (
                        <div key={index} style={{ padding: '10px', paddingBottom: 0}}>
                            <div>{chat.userNickname}</div>
                            <NewText>{chat.message}</NewText>
                        </div>
                    ))
                }
            </Receive>
            <Send>
                <div style={{ height: '20%' }}>{userNickname}</div>
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