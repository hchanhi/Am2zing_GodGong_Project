import React, { useState, useEffect } from "react";
import axios from 'axios';
import TodoCard from "./TodoCard.js";
import { getNickName } from '../jwtCheck';

function TodoList() {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);

    let [room, setRoom] = useState({
        roomCategory: "대기업",
        roomTitle: "코테 같이 공부해요!",
        userNickname: userNickname
    });
    let [rooms, setRooms] = useState([]);

    let [nowPage, setNowPage] = useState(1);
    let LastIndex = nowPage * 3;
    let sliceTodoList = [];
    sliceTodoList = rooms.slice(0, LastIndex);

    function makeRoom() {
        // RequestBody가 아닌 RequestParam으로 받기 때문에 params로 보내야 값을 인식한다.
        axios.post('/api/chat/room', { params: room })
            .then(res => {
                alert('Study방을 생성하셨습니다.');
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
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    },[])
       
    return (
        <div>
            <button onClick={() => makeRoom()}>study 만들기</button>
            {
                sliceTodoList.map((studyRoom) => {
                    return <TodoCard studyRoom={studyRoom} key={studyRoom.roomTitle} />
                })
            }

            {
                LastIndex >= (rooms && rooms.length)
                    ? null
                    : <button onClick={() => setNowPage(++nowPage)}>▼ 더보기</button>
            }
        </div>
    );
}

export default TodoList;