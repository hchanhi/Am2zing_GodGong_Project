import { useState } from "react";
import { getNickName } from './jwtCheck';
import axios from 'axios';


import { useNavigate } from "react-router-dom";
import {

    Box,
    Container,


} from '@mui/material/';
import './diary.css';



const Diary = () => {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickName = getNickName(token);

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    var format = year + "-" + (("00" + month.toString()).slice(-2)) + "-" + (("00" + date.toString()).slice(-2));
    const [state, setState] = useState({
        nickname: nickName,
        content: "",

    });

    const navigate = useNavigate();
    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    let body = {
        nickname: nickName,
        content: state.content

    };
    const handleSubmit = () => {
        axios
            .post('/api/diary/post', body)
            .then(function (response) {
                console.log(response.status, '성공');

                navigate('/mypage/diary');
                console.log(response);
                alert("저장 성공!");


            })
            .catch(function (err) {
                console.log(err);
                console.log(state);
                console.log(origin);
                console.log(err.response.data.message);
                if (err.response.status === 400) {
                    alert(err.response.data.message);
                }


            });



    };

    return (
        <Container className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <Box component="form" sx={{ mt: 3 }}>
                <div>
                    <input
                        value={nickName}
                        onChange={handleChangeState}
                        name="nickName"
                        placeholder="작성자"
                        type="text"
                        readOnly
                    />
                </div>
                <div>
                    <input
                        value={format}
                        onChange={handleChangeState}
                        name="date"
                        placeholder="작성자"
                        type="date"
                        readOnly
                    />
                </div>
                <div>
                    <textarea
                        value={state.content}
                        onChange={handleChangeState}
                        name="content"
                        placeholder="일기"
                        type="text"
                    />
                </div>
            </Box>
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </Container>
    );

};
export default Diary;
