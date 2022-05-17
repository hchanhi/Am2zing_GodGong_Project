import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SockJs from "sockjs-client";
import { Stomp } from '@stomp/stompjs';

let Receive = styled.div`
    height: 85vh;
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
    let roomId = '';

    // 소켓 통신 객체
    let sock = new SockJs("url");
    let ws = Stomp.over(sock);

    let [myMessage, setMyMessage] = useState('');
    let [newMessage, setNewMessage] = useState([]);

    useEffect(() => {
        wsConnnect();
        return wsDisConnect();
        // return () => wsDisConnect();
    }, [roomId])

    function wsConnnect() {

        ws.connect(token,

            function () {
                ws.subscribe(
                    "/sub/chat/room/" + roomId,
                    function (chat) {
                        // push는 원본에 추가 (concat은 더 느리고 원본 유지)
                        setNewMessage(newMessage.push(JSON.parse(chat.body)));
                    },
                    token
                )
            }
        )
    }

    // disconnect하지 않으면 계속 연결되어있어서 꼭 끊어줘야함. 방에서 나갈 때?
    function wsDisConnect () {
        ws.disconnect(
            function () { ws.unsubscribe('sub-0') },
            token
        );
    }

    // send도 connect안에?
    function sendMessage() {

        if (myMessage === '') {
            return;
        }

        ws.send(
            '/pub/chat/message',
            token, //header
            JSON.stringify({
                roomId: roomId,
                writer: userNickname,
                message: myMessage
            })
        );
    }
    

    return (
        <div>
            {
                newMessage && newMessage.map(chat => (
                    <Receive>
                        <div>{chat.name}</div>
                        <div>{chat.content}</div>
                    </Receive>
                ))
            }
            <Send>
                <div>닉네임</div>
                <Text onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        setMyMessage(e.target.value);
                        sendMessage();
                    }
                }}></Text>
            </Send>
        </div>
    );
}

export default Chatting;