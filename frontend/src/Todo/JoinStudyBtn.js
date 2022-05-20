import React, {useState} from "react";
import axios from "axios";
import styled from "styled-components";
import TodoModal from './TodoModal.js';

let Wrapper = styled.div`
  
`
function JoinStudyBtn({ userNickname, roomNum, setIsMember}) {

    let [modalOpen, setModalOpen] = useState(false);
    let [join, setJoin] = useState(false);
    let user = {
        userNickname: userNickname,
        roomNumber: roomNum
    }

    if (join == true) {
        axios.post('/api/chat/room/enter', null, { params: user })
            .then(res => {
                setIsMember(true);
                console.log(user);
                alert('스터디원이 되셨어요. 같이 열심히 Todo해요!')
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <Wrapper>
            <button onClick={() => setModalOpen(true)}>참여하기</button>
            {
                modalOpen && <TodoModal
                    modalContent='makeTodo'
                    open={modalOpen}
                    setOpen={setModalOpen}
                    setJoin={setJoin} />
            }
        </Wrapper>
    );
}

export default JoinStudyBtn;
