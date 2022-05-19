
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import DiaryCom from "./components/DiaryCom";

import { isAuth, getNickName } from './jwtCheck';
import {

    Box,
    Container,


} from '@mui/material/';
import './DiaryList.css';
function DiaryList(diary) {



    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);
    const navigate = useNavigate();


    const [loading, setLoading] = useState(true);
    const [diaries, setDiaries] = useState([]);
    const [state, setsState] = useState();
    const getDiaries = async () => {
        const json = await axios.get('/api/diary/mydiary', { params: { nickname: nickname } });
        setDiaries(json.data);
        console.log(json.data);
        console.log(nickname);
        setLoading(false);
        console.log(diaries.diaryContent);
        setsState(false);

    };
    useEffect(() => {
        getDiaries();
        if (!isAuth(token)) {
            alert('로그인 후 이용하실 수 있어요😥');
            return navigate('/login');
        }
    }, [state == true]);


    const handleSubmit = (diaryId) => {

        axios
            .get('/api/diary/delete/' + diaryId, { params: { diaryId: diaryId } })
            .then(function (response) {
                console.log(response.status, '성공');

                setsState(true);





            })
            .catch(function (err) {
                console.log(err);
                console.log(err.response.data.message);
                if (err.response.status === 400) {
                    alert(err.response.data.message);
                }


            });

    };



    function move_dairy() {
        navigate("/diary");
    }







    return (

        <div>
            {loading ? (
                <div >
                    <h1 >Loading...</h1>
                </div>
            ) : (
                <div>

                    <Container className='diary_header'>

                        <div > <h2>공부일기📆</h2></div>
                        <div >   <button className="diary" type="submit" onClick={() => move_dairy()}>일기쓰기</button></div>

                    </Container>
                    <div >

                        {diaries.map((diary) => (

                            <DiaryCom
                                diary={diary}
                                key={diary.diaryId}
                                diaryId={diary.diaryId}
                                diaryContent={diary.diaryContent}
                                diarySentiment={diary.diarySentiment}
                                diaryCreated={diary.diaryCreated.substr(0, 10)}
                                handleSubmit={handleSubmit}

                            />


                        ))}


                    </div>
                </div>
            )}
        </div>
    );

}
export default DiaryList;