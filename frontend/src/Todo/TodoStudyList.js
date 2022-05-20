import React, { useState, useEffect } from "react";
import axios from 'axios';
import TodoCard from "./TodoCard.js";
import { getNickName } from '../jwtCheck';
import { Grid } from "@mui/material";
import styled from "styled-components";

let Wrapper = styled.div`
    margin: auto;
    margin-top: 2vh;
    margin-bottom: 2vh;
    width: ${props => props.isHome ? '0' : '65vw'}
`

function TodoList(props) {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);

    let [room, setRoom] = useState({
        roomCategory: "대기업",
        roomTitle: "코테 같이 공부해요!",
        userNickname: userNickname
    });
    let [rooms, setRooms] = useState([]);
    let [change, setChange] = useState(false);

    let [nowPage, setNowPage] = useState(1);
    let LastIndex = nowPage * 8;
    let sliceTodoList = [];
    sliceTodoList = rooms.slice(0, LastIndex);

    function makeRoom() {

        axios.post('/api/chat/room', null, { params: room })
            .then(res => {
                alert('스터디룸을 성공적으로 만들었어요.');
                setChange(!change);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
        })
    }

    useEffect(() => {
        axios.get('/api/chat/rooms')
            .then(res => {
                setRooms(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [change])
       
    return (
        <Wrapper>
            {
                props.isHome || !userNickname
                    ? null 
                    : <button onClick={() => makeRoom()}>study 만들기</button>
            }
            
            <Grid container
                direction="row"
                alignItems="stretch"
                spacing={1}>
            {
                sliceTodoList.map(studyRoom => {
                    return <TodoCard studyRoom={studyRoom} key={studyRoom.roomNumber} />
                })
            }
            </Grid>

            {
                LastIndex >= (rooms && rooms.length) || props.isHome
                    ? null
                    : <button onClick={() => setNowPage(++nowPage)}>▼ 더보기</button>
            }
        </Wrapper>
    );
}

export default TodoList;