import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styled from "styled-components";
import TodoStudyList from "./Todo/TodoStudyList.js";
import axios from 'axios';
import { isAuth, getNickName } from './jwtCheck';
import DiaryCom from "./components/DiaryCom";

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
    h2 {
        font-size: 45pt;
        letter-spacing: 5px;
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
    
        white-space:pre;
      
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
    const [TotalTime, setTotalTime] = useState([]);
    const [MyTime, setMyTime] = useState([]);
    const [recentDate, setRecentDate] = useState();
    let navigate = useNavigate();
    const getRecentDiary = async () => {

        const json = await axios.get('/api/main/diary/recent', {params: {nickname: nickname}});

        if (json.data.diaryContent == null) {
        } else {
            setRecentDiary(json.data);
            setRecentDate(json.data.diaryCreated.substr(0, 10));
        }
    };
    function test(data){
        var h = parseInt(data/3600);
        var m = parseInt((data%3600)/60);
        var s = (data%3600)%60;
        var time = h+"시간 "+m+"분 "+s+"초";
        return time;
    };
    const getTotalTime = async () => {
        const json = await axios.get('/api/main/studytime/summary');
        if (json.data == null) {
        } else {
            setTotalTime(json.data);
        }
    };


    let body = {
        nickname : nickname
    };
    const getMyTime = async () => {
        const json = await axios.post('/api/mypage/studytime', body);
        if (json.data == null) {
        } else {
            setMyTime(json.data);
        }
    };

    useEffect(() => {
        getRecentDiary();
        getTotalTime();
        getMyTime();
    }, []);
    
    return (
        <Wrapper>
            <TodayStyle container spacing={1}>
                <StudyTime item xs={5}>
                    <div style={{ textAlign: 'left' }}>오늘의 공부시간</div>
                    <div className="studytimetoday"><h2>{test(MyTime[0])=="NaN시간 NaN분 NaN초" ? "0시간 0분 0초":test(MyTime[0])}</h2></div>
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
                    <div><h1>누적 공부 시간 랭킹</h1></div>
                    <div>현재시간 기준</div>
                    <div><h1 style={{ color: 'darkcyan' }}>한 달 ▾</h1></div>
                    <table>
                        <tbody>
                        {TotalTime.map((tt) =>(
                            <tr key={tt.nickname}>
                                <td>{tt.nickname}</td>
                                <td>{test(tt.day)}</td>
                                <td>{test(tt.week)}</td>
                                <td>{test(tt.month)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </RankingText>
                <Grid item xs={8} sx={{ textAlign: 'left' }}>
                    <div><b>1~10위</b> 누적 공부시간 랭킹에서 다른 사용자와 공부시간을 비교할 수 있습니다.</div>
                    <div>***랭킹 표***</div>
                </Grid>
            </Grid>

            <h1 style={{ textAlign: 'left' }}>함께하는 Todo✅</h1>
            <TodoStudyList isHome={true} />
            <Link to="/todoStudy" style={{ textDecoration: 'underline', textAlign: 'right' }}>
                더 보러가기
            </Link>
        </Wrapper>
    );
}

export default Home;