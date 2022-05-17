import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import SockJs from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import { getNickName } from '../jwtCheck.js';
import { RoomNumContext } from './TodoStudy.js'
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
    // room Number로 해야됨
    let roomNum = useContext(RoomNumContext);

    let [myMessage, setMyMessage] = useState('');
    let [newMessage, setNewMessage] = useState([]);

    // 소켓 통신 객체
    // let sock = new SockJs("url");
    // let ws = Stomp.over(sock);
    let ws = Stomp.over(function () { return new SockJs("http://localhost:8080/api/ws")});

    useEffect(() => {
        wsConnnect();
        // return wsDisConnect();
        // return () => wsDisConnect();
    // 다른방으로 갈 때 연결/구독 해제
    }, [roomNum])

    // 입장할때 room/chat/enter로 message없이 보내기
    // 삭제하고 다시만드는건 처음에만 만들 수 있음
    function wsConnnect() {

        try {
            ws.connect({},
                function () {
                    ws.subscribe(
                        "/sub/chat/room/" + roomNum,
                        function (chat) {
                            // push는 원본에 추가 (concat은 더 느리고 원본 유지)
                            setNewMessage(newMessage.push(JSON.parse(chat.body)));
                        },
                        {}
                    )
                }
            )
        } catch (err) {
            console.log(err);
        }
    }

    // send도 connect안에?
    function sendMessage() {

        try {
            if (myMessage === '') {
                return;
            }

            ws.send(
                '/pub/chat/message',
                {}, //header
                JSON.stringify({
                    roomNum: roomNum,
                    writer: userNickname,
                    message: myMessage
                })
            );
        } catch(err) {
            console.log(err);
        }
    }

    // disconnect하지 않으면 계속 연결되어있어서 꼭 끊어줘야함. 방에서 나갈 때?
    function wsDisConnect() {
        ws.disconnect(
            function () { ws.unsubscribe('sub-0') },
            {}
        );
    }

    return (
        <div>
            <IconButton onClick={() => wsDisConnect()}>
                <CloseIcon />
            </IconButton>
            <Receive>
                {
                    newMessage && newMessage.map(chat => (
                        <div>
                            <div>{chat.name}</div>
                            <div>{chat.content}</div>
                        </div>
                    ))
                }
            </Receive>
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