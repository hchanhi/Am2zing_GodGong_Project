import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckboxTodo from "./CheckboxTodo.js";
import ChattingBox from "./ChattingBox.js";
import JoinStudyBtn from "./JoinStudyBtn.js";
import { isAuth, getNickName } from '../jwtCheck.js';
import { Grid, Chip } from '@mui/material/';
import SockJs from "sockjs-client";

let Wrapper = styled.div`
    margin: auto;
    padding: 3rem 0;
    width: 70%;
    text-align: left;

    h3 {
        margin-top: 1rem;
    }
`;

export let RoomNumContext = React.createContext();
export let NewMessageContext = React.createContext();
export let ClientContext = React.createContext();

function TodoStudy() {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);
    const navigate = useNavigate();

    let myId = "";
    let { roomNum } = useParams();
    let [isMember, setIsMember] = useState(false);
   


    let [newMessage, setNewMessage] = useState([]);
    let [badgeNum, setBadgeNum] = useState(-1);
    let StompJs = require('@stomp/stompjs');
    let client = useRef({});

    let [study, setStudy] = useState({
        roomCategory: "",
        roomTitle: "",
        roomUuid: "",
        roomCreated: "",
        roomEntry: "",
        memberId: ""
    });

    // 새로고침하면 state 초기화되니까 이 방 안에서 내가 이 방 멤버인지 체크하는거 있어야함
    useEffect(() => {
        if (!isAuth(token)) {
            alert('로그인 후 이용하실 수 있어요😥');
            return navigate('/login');
        };
        // roomlog에 입장요청하는 ajax필요
        // room/enter roomNum이랑 닉네임 보내기
        // axios /room/enter 몇명들어가있는지 roomlog > return : 인원수세는거 (후순위)
        connect();
        return () => disConnect();
    }, []);

    useEffect(() => {
        setBadgeNum(++badgeNum);
    }, [newMessage])

    function connect() {
        client.current = new StompJs.Client({
            // brokerURL: "ws://localhost:8080/api/ws", // 웹소켓 서버로 직접 접속하는 것
            webSocketFactory: () => { return new SockJs("http://localhost:8080/api/ws") },
            connectHeaders: {},
            debug: function (str) {
                console.log(str);
            },
            // reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        })

        client.current.onConnect = () => {
            subscribe();
            try {
                client.current.publish({
                    // message로 입장메시지 직접 넣는걸로 변경해도 무방
                    destination: '/pub/chat/enter',
                    body: JSON.stringify({
                        roomNumber: roomNum,
                        userNickname: userNickname,
                        message: ''
                    })
                });
            } catch (err) {
                console.log(err.message);
            }
        }

        client.current.onStompError = function (frame) {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };

        client.current.activate();
    }

    function subscribe() {
        client.current.subscribe("/sub/room/" + roomNum,
            function (chat) {
                if (chat.body) {
                    setNewMessage(newMessage => [...newMessage, JSON.parse(chat.body)]);
                } else {
                    alert('got empty message!')
                }
            }
        )
    };

    // 누가 입장하셨습니다 하면 그때 setState해서 리렌더링해서 투두를 가져오게 하기
    function disConnect() {
        client.current.deactivate();
    };

    // 입장을 하시겠습니까? 하면 그때 뜨게

    // useEffect(() => {
    //     axios.get('/api/todoStudy/', { params: { roomNum: roomNum } })
    //         .then((res) => {
    //             setStudy(res.data);
    //             if (res.data((x) => x.memberId == myId).length != 0) {
    //                 setIsMember(true);
    //             }
    //             // todo list작성하는 모달
    //         }).catch((error) => {
    //             // alert('Todo study방의 정보를 가져오는 데 실패했습니다.');
    //             console.log(error);
    //         });
    // }, [study]);
    // 다른 스터디원의 실시간 투두 진행상황 보려면 양방향 데이터 통신 필요

    return (
        <Wrapper>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <h1>에너지 넘치는 2조 투두방📚</h1>
                </Grid>
                <Grid item xs={6}>
                    <Chip label='대기업' />
                    <h3>현재인원 : 4/5명</h3>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <RoomNumContext.Provider value={roomNum}>
                        <NewMessageContext.Provider value={newMessage}>
                            <ClientContext.Provider value={client.current}>
                                <ChattingBox badgeNum={badgeNum} setBadgeNum={setBadgeNum}/>
                            </ClientContext.Provider>
                        </NewMessageContext.Provider>
                    </RoomNumContext.Provider>
                </Grid>
                <Grid item xs={12}>
                    <CheckboxTodo />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                    {
                        isMember
                            ? <button>나가기</button>
                            : <RoomNumContext.Provider value={roomNum}>
                                <JoinStudyBtn userNickname={userNickname} roomNum={roomNum} setIsMember={setIsMember} />
                            </RoomNumContext.Provider>
                    }
                   
                </Grid>
            </Grid>
        </Wrapper>
    );
}

export default TodoStudy;