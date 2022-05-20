import { Button } from "@mui/material";
import React, { useContext } from "react";
import { RoomNumContext, ClientContext } from './TodoStudyRoom.js'
import { getNickName } from '../jwtCheck.js';

function DeleteTodoBtn() {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);
    let client = useContext(ClientContext);
    let roomNum = useContext(RoomNumContext);

    function deleteTodo() {
        try {
            client.publish({
                destination: '/pub/todo/delete',
                body: JSON.stringify({
                    roomNumber: roomNum,
                    userNickname: userNickname,
                    result: ''
                })
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            <Button
                variant="contained"
                style={{ backgroundColor: 'red' }}
                onClick={deleteTodo()}>
                삭제하기
            </Button>
        </div>
    );
}

export default DeleteTodoBtn;