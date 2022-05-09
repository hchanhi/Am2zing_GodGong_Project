import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Modal from "../Modal";

function TodoStudy() {

    let { id } = useParams();

    let [study, setStudy] = useState({
        roomCategory: "",
        roomTitle: "",
        roomUuid: "",
        roomCreated: "",
        roomEntry: "",
        memberId: ""
    });
    let askLeave = () => {
        if (window.confirm('페이지를 떠나면 이 스터디에서 나가게 돼요. 정말 떠나실 건가요?😥')) {
            // room DB에서 나의 정보 삭제
            // 일기작성 모달로 넘어감 (모달직접구현하기)
            <Modal />
        } else {
            return false;
        }
    }

    // *참여하기 버튼을 누른 뒤* 페이지를 벗어나는 경우(뒤로가기, 페이지이동, 페이지닫기)
    let listner = (event) => {
        event.preventDefault();
        
    }
    window.addEventListener('beforeunload', listner);
    
    useEffect(() => {
        axios.get('/api/todoStudy/', {params: {roomId: id}})
            .then((res) => {
                setStudy(res.data);
                // todo list작성하는 모달 띄움
            }).catch((error) => {
                alert('Todo study방의 정보를 가져오는 데 실패했습니다.');
                console.log(error);
            });
    }, [study]);
    // 다른 스터디원의 실시간 투두 진행상황 보려면 양방향 데이터 통신 필요

    return (
        <div>
            <h3>스터디방 id : {id}</h3>
            <button>참여하기</button>
        </div>
    );
}

export default TodoStudy;