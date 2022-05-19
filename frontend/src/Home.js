import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styled from "styled-components";
import TodoList from "./Todo/TodoList.js";
import axios from 'axios';
import { isAuth, getNickName } from './jwtCheck';
let Wrapper = styled.div`
    margin: auto;
    width: 65%;
    height: 100%;
`;

let TodayStyle = styled(Grid)`
    background-color: white;
    box-shadow: 15px 15px 10px rgb(226, 233, 230);
    border-radius: 20px;
    padding: 1rem 3rem;
`;
let StudyTime = styled(Grid)`

    height: 100%;

    div {
        font-size: 13pt;
    }
    h1 {
        font-size: 50pt;
        letter-spacing: 6px;
        margin: 4vh 0;
    }
    button {
        font-family: 'Pretendard-Medium';
        border-radius: 40px;
        font-size: 16pt;
        margin-bottom: 3vh;
        width: 12vw;
        background-color: lightseagreen
    }
`;
let StudyDiary = styled(Grid)`
    span {
        font-size: 13pt;
        margin-left: 0;
    }
    div {
        background-color: mintcream;
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 20px;
        border: solid 1px lightseagreen;
        // box-shadow: 1px 1px 10px gainsboro;
    }
`;
let RankingText = styled(Grid)`
    text-align: left;
    div {
        margin: 3vh 0;
    }
`;

function Home() {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);

    const [recentDiary, setRecentDiary] = useState([]);
    const [recentDate, setRecentDate] = useState();
    let navigate = useNavigate();
    const getRecentDiary = async () => {
        const json = await axios.get('/api/main/diary/recent', {params: {nickname: nickname}});
        console.log(json, '성공');
        if (json.data.diaryContent == null) {
            console.log("널");
        } else {
            console.log(json.data.diaryContent);
            console.log(nickname);
            setRecentDiary(json.data);
            setRecentDate(json.data.diaryCreated.substr(0, 10));
        }
    };
    useEffect(() => {
        getRecentDiary();

    }, []);
    console.log(recentDiary.diaryId);
    const editdate = recentDiary.diaryCreated;
    return (
        <Wrapper>
            <TodayStyle container spacing={1}>
                <StudyTime item xs={5}>
                    <div style={{ textAlign: 'left' }}>오늘의 공부시간</div>
                    <div><h1>09:34</h1></div>
                    <div><Button variant="contained" size="large" onClick={() => navigate("/challenge")}>공부 시작</Button></div>
                </StudyTime>
                <StudyDiary item xs={7} sx={{ textAlign: 'left' }}>

                        <span>오늘의 공부일기</span>
                        <div>
                            <span>{recentDate}</span>
                            <br></br>
                            <br></br>
                            {recentDiary.diaryContent == null ?
                                <h3>일기를 한번도 작성하지 않으셨어요!</h3> :
                                <h3>{recentDiary.diaryContent}</h3>}
                                <br></br>
                                <br></br>
                                {recentDiary.diarySentiment == null ?
                                    <h5></h5> :
                                    recentDiary.diarySentiment === 'neutral' ?
                                        <h5>감정분석결과 : 기분이 보통입니다. 😐</h5> :
                                        recentDiary.diarySentiment === 'negative' ?
                                            <h5>감정분석결과 : 기분이 나쁩니다. 👿</h5>
                                            : <h5>감정분석결과 : 기분이 좋습니다. 🥰</h5>
                            }
                        </div>


                </StudyDiary>
            </TodayStyle>

            <Grid container spacing={1} sx={{ marginTop: '3vh' }}>
                <RankingText item xs={4} sx={{ margin: '5vh 0 10vh' }}>
                    <div><h1 style={{ color: 'darkcyan' }}>하루 전 ▾</h1></div>
                    <div><h1>누적 공부 시간 랭킹</h1></div>
                    <div>2022.05.25(수) 오전 06:00 기준</div>
                </RankingText>
                <Grid item xs={8} sx={{ textAlign: 'left' }}>
                    <div><b>1~10위</b> 누적 공부시간 랭킹에서 다른 사용자와 공부시간을 비교할 수 있습니다.</div>
                    <div>***랭킹 표***</div>
                </Grid>
            </Grid>

            <h1 style={{ textAlign: 'left' }}>함께하는 Todo✅</h1>
            <TodoList isHome={true} />
            <Link to="/todoList" style={{ textDecoration: 'underline', textAlign: 'right' }}>
                더 보러가기
            </Link>
        </Wrapper>
    );
}

export default Home;