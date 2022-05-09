import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Modal from "../Modal";
import { Grid, Card, Chip, CardContent, Checkbox, Typography } from '@mui/material/';
import styled from "styled-components";
import { BsChatDots } from 'react-icons/bs'
import CheckboxTodo from "./CheckboxTodo";

let Wrapper = styled.div`
    margin: auto;
    padding: 3rem 0;
    width: 70%;
    text-align: left;
`
let CardStyle = styled(Card)`
    width: 20%;
    minWidth: 200;
    float: left;
    
    hr {
        margin: 0.5rem 0;
        color: gray;
    }
`
let CardContentStyle = styled(CardContent)`
    background-color: WhiteSmoke;
    
`

function TodoStudy() {

    let myId = "";
    let { id } = useParams();
    let [isMember, setIsMember] = useState(false);
    let [checked, setChecked] = useState(false);

    let [study, setStudy] = useState({
        roomCategory: "대기업",
        roomTitle: "",
        roomUuid: "",
        roomCreated: "",
        roomEntry: "",
        memberId: ""
    });

    let changeFunc = (e) => {
        setChecked(e.target.checked);
    }

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
        <Wrapper>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <h1>에너지 넘치는 2조 투두방📚</h1>
                </Grid>
                <Grid item xs={6}>
                    <Chip label={study.roomCategory}/><br/>
                    현재 4/5명
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <BsChatDots size="50"/>
                </Grid>
                <Grid item xs={12}>
                    <CheckboxTodo />
                    <CardStyle>
                        <CardContentStyle>
                            <h3>닉네임의 Todo</h3>
                            <hr />
                            <Typography variant="body">
                                수행할 투두리스트
                                <Checkbox
                                    edge="end"
                                    checked={checked}
                                    onChange={changeFunc}
                                    defaultChecked color="default"/>
                                <br />
                            </Typography>
                            <br/><h4>현재 진행 중 ... (50%)</h4>
                        </CardContentStyle>
                    </CardStyle>
                    
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'right'}}>
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