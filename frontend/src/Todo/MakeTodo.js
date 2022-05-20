import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Button, Input } from '@mui/material';
import axios from "axios";
import { RoomNumContext } from './TodoStudyRoom.js'
import { getNickName } from '../jwtCheck.js';

let Wrapper = styled.div`
  
`
function MakeTodo({ setOpen, setJoin }) {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);
    let roomNum = useContext(RoomNumContext);
    let [todos, setTodos] = useState({
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '', 
        7: '',
        8: '', 
        9: '',
        10: ''
    });
    let i = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    

    function onChange(e) {
        setTodos({
            ...todos, [e.target.name]: e.target.value
        })
    }
    
    function todoNumCheck() {
        let num = 0;

        todos.map(todo => {
            if (todo == '') ++num;
        })

        if (num == 10)
            return false;
        else return true;
    }

    function postTodo() {
        todos.map((todo, i) => {
            if (todo != '') {
                axios.post('/api/todo/insert', {
                    params: {
                        userNickname: userNickname,
                        content: todo.i,
                        roomNumber: roomNum
                    }
                })
                    .then(res => {
                        alert(userNickname + '님의 Todo가 등록되었습니다.');
                        console.log(res.data);
                    })
                    .catch(err => {
                        alert('Todo 등록에 실패했습니다. 다시 시도해주세요.');
                        console.log(err);
                    })
            }
        })
    }

    return (
        <Wrapper>
            <h3>나의 Todo List 만들기</h3>
            <p>Todo는 최소 1개, 최대 10개까지 만들 수 있습니다.</p>
            
            {
                i.map(i => {
                    <Input
                        autoFocus
                        onChange={onChange}
                        name={i}
                    />
                })
            }
           
            {/* Todo추가버튼은 아이콘으로 변경 */}
            <Button onClick={async () => {
                if (!todoNumCheck()) {
                    return alert('todo는 최소 1개 작성해야 합니다.')
                };
                await postTodo();
                setOpen(false);
                setJoin(true);
            }}>스터디시작</Button>
        </Wrapper>
    );
}

export default MakeTodo;