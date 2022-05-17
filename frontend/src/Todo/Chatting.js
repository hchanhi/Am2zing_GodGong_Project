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
    let roomNum = useContext(RoomNumContext);

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
                        "/sub/room/" + roomNum,
                        function (chat) {
                            // push는 원본에 추가 (concat은 더 느리고 원본 유지)
                            setNewMessage(newMessage.concat(JSON.parse(chat.body)));
                            console.log(chat.body);
                            console.log('여기까지 왔니?');
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
    function sendMessage(myMessage) {

        try {
            if (myMessage === '') {
                return;
            }

            ws.send(
                '/pub/chat/message',
                {}, //header
                JSON.stringify({
                    roomNumber: roomNum,
                    userNickname: userNickname,
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
            // // unsubscribe는 서버와의 연결을 끊는게 아닌 특정 메시지의 send를 수신하지 않겠다는 것
            // function () { ws.unsubscribe() },
            // {}
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