import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckboxTodo from "./CheckboxTodo.js";
import ChattingBox from "./ChattingBox.js";
import JoinStudyBtn from "./JoinStudyBtn.js";
import ExitStudyBtn from "./ExitStudyBtn.js";
import DeleteTodoBtn from "./DeleteTodoBtn.js"
import { isAuth, getNickName } from '../jwtCheck.js';
import { Grid, Chip } from '@mui/material/';
import { connect, disConnect } from './chattingConnect.js';

let Wrapper = styled.div`
    margin: auto;
    padding: 3rem 0;
    width: 70%;
    text-align: left;

    h3 { margin-top: 1rem }

    button {
        font-family: 'Pretendard-Medium';
        font-size: 13pt;
        background-color: lightseagreen
    }
`;

export let RoomNumContext = React.createContext();
export let NewMessageContext = React.createContext();
export let ClientContext = React.createContext();
export let SetMemberContext = React.createContext();
export let TaskContext = React.createContext();

function TodoStudy() {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);
    let nickname = {
        userNickname: userNickname
    }
    const navigate = useNavigate();
    let { roomNum } = useParams();
    let roomNumber = {
        roomNumber: roomNum
    }
    let [isMember, setIsMember] = useState(false);
    let [hasTodo, setHasTodo] = useState(false);
   
    let [newMessage, setNewMessage] = useState([]);
    let [badgeNum, setBadgeNum] = useState(-1);
    let client = useRef({});

    useEffect(() => {
        if (!isAuth(token)) {
            alert('로그인 후 이용하실 수 있어요😥');
            return navigate('/login');
        };

        // 여기 리턴값에 todo도 들어있으면 todo있는지 없는지에 따라 todo버튼 생성할지말지 결정 가능
        axios.get('/api/chat/room/check', { params: nickname })
            .then(res => {
                console.log(res.data);
                if (!res.data)
                    setIsMember(false);
                else if (res.data.room.roomNumber == roomNum) {
                    setIsMember(true);
                    // '오늘'의 todo가 있는지 체크해야함
                    if (res.data.todo) {
                        setHasTodo(true);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
        
        // message가 입장, 퇴장, done일때 리렌더링되야함
        axios.get('/api/todo/room', {params: roomNumber})
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        // axios /room/enter 몇명들어가있는지 roomlog > return : 인원수세는거 (후순위)
        connect(client, roomNum, userNickname, setNewMessage, newMessage);
        return () => disConnect(client);
    }, []);

    useEffect(() => {
        setBadgeNum(++badgeNum);
    }, [newMessage])

    // 다른 스터디원의 실시간 투두 진행상황 보려면 양방향 데이터 통신 필요

    return (
        <Wrapper>
            <Grid alignItems="center" container spacing={4}>
                <Grid item xs={8}>
                    <h1>에너지 넘치는 2조 투두방📚</h1>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'right' }}>
                    {
                        isMember
                            ? (hasTodo
                                ? <RoomNumContext.Provider value={roomNum}>
                                    <ClientContext.Provider value={client.current}>
                                        <DeleteTodoBtn />
                                    </ClientContext.Provider>
                                </RoomNumContext.Provider>
                                : <RoomNumContext.Provider value={roomNum}>
                                    <SetMemberContext.Provider value={setIsMember}>
                                        <JoinStudyBtn task={'onlyMake'} />
                                    </SetMemberContext.Provider>
                                </RoomNumContext.Provider>)
                            : null
                    }
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'right' }}>
                    {
                        isMember
                            ? <ExitStudyBtn task={'exit'} />
                            : <RoomNumContext.Provider value={roomNum}>
                                <SetMemberContext.Provider value={setIsMember}>
                                    <ClientContext.Provider value={client.current}>
                                        <JoinStudyBtn task={'join'} />
                                    </ClientContext.Provider>
                                </SetMemberContext.Provider>
                            </RoomNumContext.Provider>
                    }
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
              
            </Grid>
        </Wrapper>
    );
}

export default TodoStudy;