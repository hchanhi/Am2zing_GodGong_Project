
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
    const nickname = getNickName(token);
    const userId = getId(token);
    const navigate = useNavigate();



    const [user, seUser] = useState([]);
    const [state, setsState] = useState();
    const getDiaries = async () => {
        const json = await axios.get('/api/user/' + userId, { params: { id: userId } });
        console.log(json);

    };
    useEffect(() => {
        getDiaries();
        if (!isAuth(token)) {
            alert('로그인 후 이용하실 수 있어요😥');
            return navigate('/login');
        }
    }, [state == true]);
    const handleSubmit = () => {


    };


    return (
        <Container className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <Box component="form" sx={{ mt: 3 }}>
                <div>
                    <input
                        name="nickName"
                        placeholder="작성자"
                        type="text"
                        readOnly

                    />
                </div>
                <div>
                    <input
                        name="date"
                        placeholder="작성자"
                        type="date"
                        readOnly
                    />
                </div>
                <div>
                    <textarea

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
