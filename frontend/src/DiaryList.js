
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryButton from './components/DiaryButton';
import axios from 'axios';
import './diary.css';
import DiaryCom from "./components/DiaryCom";

import { isAuth, getNickName } from './jwtCheck';


function DiaryList(diary) {



    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);
    const navigate = useNavigate();


    const [loading, setLoading] = useState(true);
    const [diaries, setDiaries] = useState([]);
    const getDiaries = async () => {
        const json = await axios.get('/api/diary/mydiary', { params: { nickname: nickname } });
        setDiaries(json.data);
        console.log(json.data);
        console.log(nickname);
        setLoading(false);
        console.log(diaries.diaryContent);
        console.log(diaries.length);



    };
    useEffect(() => {
        getDiaries();
        if (!isAuth(token)) {
            alert('로그인 후 이용하실 수 있어요😥');
            return navigate('/login');
        }
    }, [diary]);


    const handleSubmit = (diaryId) => {

        axios
            .get('/api/diary/delete/' + diaryId, { params: { diaryId: diaryId } })
            .then(function (response) {
                console.log(response.status, '성공');





            })
            .catch(function (err) {
                console.log(err);
                console.log(err.response.data.message);
                if (err.response.status === 400) {
                    alert(err.response.data.message);
                }


            });

    };











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