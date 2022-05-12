import { useRef, useState } from "react";

import axios from 'axios';

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControl,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Grid,
    Box,
    Typography,
    Container,
    Link,

} from '@mui/material/';
import './diary.css';

let Wrapper = styled.div`
    margin: auto;
    padding: 3rem 0;
    width: 70%;
    text-align: left;

    h3 {
        margin-top: 1rem;
    }
`;

const Diary = (props) => {

    const nickName = props.userNickName;


    const authorInput = useRef();
    const contentInput = useRef();


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
        content: state.content,
    };
    const handleSubmit = () => {
        axios
            .post('/api/diary/post', body)
            .then(function (response) {
                console.log(response.status, '성공');

                navigate('/login');
                console.log(state);
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
