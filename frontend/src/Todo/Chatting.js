import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
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
    let ws = StompJs.over(sock);

    let [message, setMessage] = useState('');
    let [writer, setWriter] = useState('');

    useEffect(() => {
        wsConnnect();
        return wsDisConnect();
    }, [roomId])

    // 웹소켓 연결, 구독??
    function wsConnnect() {
        ws.connect(
            { token: token },
            function () {
                ws.subscribe("/api/room/chat/" + roomId, function (chat) {

                    if (writer === nickName) {
                        let newMessage = JSON.parse(chat.body);
                        setWriter('');
                        // styled-components 가변스타일링 나중에 주기
                    } else {
                        let newMessage = JSON.parse(chat.body);
                        setWriter(newMessage.writer);
                    }
                },
                { token: token }
                )
            }
        )
    }

    function wsDisConnect () {
        ws.disconnect(
            function () { ws.unsubscribe('sub-0') },
            { token: token }
        );
    }

    function waitForConnection(ws, callback) {
        setTimeout(
            function () {
                if (ws.ws.readyState === 1) {
                    callback();
                } else {
                    waitForConnection(ws, callback);
                }
            },
            1
        );
    }

    function sendMessage() {

        if (!token) {
            alert("로그인 후 이용하실 수 있어요.");
            navigate('/login');
        }

        let chat = {
            roomId: roomId,
            writer: writer,
            message: message
        };

        if (message === '') {
            return;
        }

        waitForConnection(ws, function () {
            ws.send(
                'url',
                { token: token }, //header
                JSON.stringify(chat)
            );
        })
    }
    

    return (
        <div>
            <Receive>
                <div>{writer}</div>
                <div>{message}</div>
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