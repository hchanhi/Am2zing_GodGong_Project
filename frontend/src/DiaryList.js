import PropTypes from 'prop-types';
import React, { Component, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styled from "styled-components";
import DiaryButton from './components/DiaryButton';
import axios from 'axios';
import './diary.css';
import DiaryCom from "./components/DiaryCom";
function DiaryList(props) {

    const nickname = props.userNickName;

    const [diaries, setDiaries] = useState([]);
    const getDiaries = async () => {
        const json = await axios.get('/api/diary/mydiary', { params: { nickname: nickname } });
        setDiaries(json.data);
        console.log(json.data);

    };
    useEffect(() => {
        getDiaries();
    }, []);



    return (
        <div>
            <h3>{props.userNickName}님의 마이페이지💁🏻‍♀️</h3>

            <h2>공부일기 목록들입니다. 하단에 나올 예정입니다.</h2>
            <h2></h2>
            <DiaryButton text={'버튼'} onClick={() => alert("버튼 클릭")} type={'positive'} />
            <DiaryButton text={'버튼'} onClick={() => alert("버튼 클릭")} type={'negative'} />
            <DiaryButton text={'버튼'} onClick={() => alert("버튼 클릭")} />
            <div >

                {diaries.map((diary) => (
                    <DiaryCom
                        key={diary.diaryId}
                        diaryId={diary.diaryId}
                        diaryContent={diary.diaryContent}
                        diarySentiment={diary.diarySentiment}
                        diaryCreated={diary.diaryCreated.substr(0, 10)}


                    />

                ))}


            </div>
        </div>
    );

}
export default DiaryList;