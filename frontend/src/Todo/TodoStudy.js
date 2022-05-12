import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Modal from "../Modal";
import CheckboxTodo from "./CheckboxTodo";
import ChattingBox from "./ChattingBox";
import { Grid, Chip } from '@mui/material/';

let Wrapper = styled.div`
    margin: auto;
    padding: 3rem 0;
    width: 70%;
    text-align: left;

    h3 {
        margin-top: 1rem;
    }
`;

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
        axios.get('/api/todoStudy/', { params: { roomId: id } })
            .then((res) => {
                setStudy(res.data);
                if (res.data((x) => x.memberId == myId).length != 0) {
                    setIsMember(true);
                }
                // todo list작성하는 모달
                <Modal />;
            }).catch((error) => {
                // alert('Todo study방의 정보를 가져오는 데 실패했습니다.');
                console.log(error);
            });
    }, [study]);
    // 다른 스터디원의 실시간 투두 진행상황 보려면 양방향 데이터 통신 필요

    return (
        <Wrapper>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <h1>에너지 넘치는 2조 투두방📚</h1>
                </Grid>
                <Grid item xs={6}>
                    <Chip label='대기업' color="info" />
                    <h3>현재인원 : 4/5명</h3>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <ChattingBox />
                </Grid>
                <Grid item xs={12}>
                    <CheckboxTodo />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                    {
                        isMember
                            ? <button>나가기</button>
                            : <button>참여하기</button>
                    }
                </Grid>
            </Grid>



        </Wrapper>
    );
}

export default TodoStudy;