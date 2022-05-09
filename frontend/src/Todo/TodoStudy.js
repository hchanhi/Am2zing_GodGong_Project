import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../Modal";

function TodoStudy() {

    let myId = "";
    let { id } = useParams();
    let [isMember, setIsMember] = useState(false);

    let [study, setStudy] = useState({
        roomCategory: "",
        roomTitle: "",
        roomUuid: "",
        roomCreated: "",
        roomEntry: "",
        memberId: ""
    });

    useEffect(() => {
        axios.get('/api/todoStudy/', {params: {roomId: id}})
            .then((res) => {
                setStudy(res.data);
                if (res.data((x) => x.memberId == myId).length != 0) {
                    setIsMember(true);
                }
                // todo list작성하는 모달
                <Modal />
            }).catch((error) => {
                // alert('Todo study방의 정보를 가져오는 데 실패했습니다.');
                console.log(error);
            });
    }, [study]);
    // 다른 스터디원의 실시간 투두 진행상황 보려면 양방향 데이터 통신 필요

    return (
        <div>
            <h3>스터디방 id : {id}</h3>
            {study.roomCategory}
            {study.roomTitle}
            {
                isMember
                    ? <button>나가기</button>
                    : <button>참여하기</button>
            }
        </div>
    );
}

export default TodoStudy;