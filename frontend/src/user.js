
import { useState, useEffect, useContext } from "react";
import { isAuth, getNickName, getId } from './jwtCheck';
import axios from 'axios';


import { useNavigate, useParams } from "react-router-dom";
import {

    Box,
    Container,


} from '@mui/material/';
import './diary.css';



const User = () => {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickName = getNickName(token);
    const userId = getId(token);
    const { id, diaryContent } = useParams();

    console.log(id);
    console.log(diaryContent);
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    var format = year + "-" + (("00" + month.toString()).slice(-2)) + "-" + (("00" + date.toString()).slice(-2));
    const [state, setState] = useState({

        content: diaryContent,

    });

    const navigate = useNavigate();
    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    let body = {
        diaryId: id,
        content: state.content

    };
    console.log(state.content);
    console.log(id.diaryContent);
    useEffect(() => {
        if (!isAuth(token)) {
            alert('로그인 후 이용하실 수 있어요😥');
            return navigate('/login');
        }
    }, []);

    const handleSubmit = () => {
        axios
            .post('/api/diary/edit/' + id, body)
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
export default User;
