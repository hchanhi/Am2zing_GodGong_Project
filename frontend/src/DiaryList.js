
import React, { useEffect, useState } from 'react';

import DiaryButton from './components/DiaryButton';
import axios from 'axios';
import './diary.css';
import DiaryCom from "./components/DiaryCom";


import { getNickName } from './jwtCheck';


function DiaryList(props) {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);

    const [loading, setLoading] = useState(true);
    const [diaries, setDiaries] = useState([]);
    const getDiaries = async () => {
        const json = await axios.get('/api/diary/mydiary', { params: { nickname: nickname } });
        setDiaries(json.data);
        console.log(json.data);
        console.log(nickname);
        setLoading(false);
        console.log(diaries.diaryContent);


    };
    useEffect(() => {
        getDiaries();

    }, [setDiaries]);


        if (!isAuth(token)) {
            alert('로그인 후 이용하실 수 있어요😥');
            return navigate('/login');
        }
    }, []);




    return (

        <div>
            {loading ? (
                <div >
                    <h1 >Loading...</h1>
                </div>
            ) : (
                <div>
                    <h3>{getNickName(token)}님의 마이페이지💁🏻‍♀️</h3>

                    <h2>공부일기📆</h2>

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
            )}
        </div>
    );

}
export default DiaryList;