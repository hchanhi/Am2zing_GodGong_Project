import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styled from "styled-components";
import TodoList from "./Todo/TodoList.js";

let Wrapper = styled.div`
    margin: auto;
    padding-bottom: 10vh;
    width: 65%;
    height: 100%;
`

let TodayStyle = styled(Grid)`
    background-color: rgb(232, 233, 233);
    border-radius: 20px;
    padding: 1rem 3rem;
`
let StudyTime = styled(Grid)`

    height: 100%;

    div {
        color: dimgrey;
        font-size: 13pt;
    }
    h1 {
        font-size: 40pt;
        letter-spacing: 6px;
        color: black;
        margin: 4vh 0;
        font-weight: normal;
    }
    button {
        font-family: 'Pretendard-Medium';
        border-radius: 40px;
        font-size: 16pt;
        margin-bottom: 3vh;
        width: 12vw;
        background-color: rgb(62, 26, 224)
    }
`
let StudyDiary = styled(Grid)`
    span {
        color: dimgrey;
        font-size: 13pt;
        margin-left: 0;
    }
    div {
        background-color: white;
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 20px;
    }
`
let RankingText = styled(Grid)`
    text-align: left;
    div {
        margin: 3vh 0;
    }
`

function Home() {

    let navigate = useNavigate();

    return (
        <Wrapper>
            <TodayStyle container spacing={1}>
                <StudyTime item xs={5}>
                    <div style={{textAlign: 'left'}}>오늘의 공부시간</div>
                    <div><h1>09:34</h1></div>
                    <div><Button variant="contained" size="large" onClick={() => navigate("/challenge")}>공부 시작</Button></div>
                </StudyTime>
                <StudyDiary item xs={7} sx={{ textAlign: 'left' }}>
                    <Link to="/diary">
                        <span>오늘의 공부일기</span>
                        <div>나중에 더보기 처리하기</div>
                    </Link>
                </StudyDiary>
            </TodayStyle>

            <Grid container spacing={1} sx={{ marginTop: '3vh'}}>
                <RankingText item xs={4} sx={{ margin: '5vh 0 10vh' }}>
                    <div><h1 style={{ color: 'rgb(62, 26, 224)' }}>하루 전 ▾</h1></div>
                    <div><h1>누적 공부 시간 랭킹</h1></div>
                    <div>2022.05.25(수) 오전 06:00 기준</div>
                </RankingText>
                <Grid item xs={8} sx={{ textAlign: 'left'}}>
                    <div><b>1~10위</b> 누적 공부시간 랭킹에서 다른 사용자와 공부시간을 비교할 수 있습니다.</div>
                    <div>***랭킹 표***</div>
                </Grid>
            </Grid>
            <h1 style={{ textAlign: 'left' }}>최신 TODO Study</h1>
            <TodoList isHome={true}/>
            <Link to="/todoList" style={{ textDecoration: 'underline' }}>
                더 보러가기
            </Link>
            <br></br>
        </Wrapper>
    );
}

export default Home;