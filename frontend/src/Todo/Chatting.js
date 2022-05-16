import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SockJs from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import { useNavigate } from "react-router-dom";

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

function Chatting(props) {

    let token = localStorage.getItem('access-token');
    let navigate = useNavigate();
    let roomId = '';
    let nickName = '';

    // 소켓 통신 객체
    let sock = new SockJs("url");
    let ws = Stomp.over(sock);

    let [message, setMessage] = useState('');
    let [newMessage, setNewMessage] = useState([]);
    let [writer, setWriter] = useState('');

    useEffect(() => {
        wsConnnect();
        return wsDisConnect();
    }, [roomId])

    function wsConnnect() {
        // token위치 위 아래 중 어디인지 정확한 공식문서 찾아보기...
        ws.connect(token,
            function () {
                // subscribe는 채팅내용을 받을 때?
                ws.subscribe(
                    "/api/room/chat/" + roomId,
                    function (chat) {
                        if (writer === nickName) {
                            // 추가하는 복사 필요?
                            setNewMessage(JSON.parse(chat.body));
                            setWriter('');
                        } else {
                            setNewMessage(JSON.parse(chat.body));
                            setWriter(newMessage.writer);
                        }
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

    function sendMessage() {

        let chat = {
            roomId: roomId,
            writer: writer,
            message: message
        };

        if (message === '') {
            return;
        }

        // 버전에 따라 publish라는 말을 쓰기도 하는 것 같음
        ws.send(
            'url',
            token, //header
            JSON.stringify(chat)
        );
    }
    

    return (
        <div>
            <Receive>
                <div>{writer}</div>
                <div>{newMessage}</div>
            </Receive>
            <Send>
                <div>닉네임</div>
                <Text onKeyDown={(e) => {
                    setMessage(e.target.value)
                    if (e.key == 'Enter') {
                        sendMessage();
                    }
                }}></Text>
            </Send>
        </div>
    );
}

export default Chatting;