import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

import {
    Button,
    TextField,
    FormControl,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material/';

import './join.css';

const Register = () => {

    const [passwordState, setPasswordState] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    let { key } = useParams();

    useEffect( () => {
        console.log(key);
        // key값을 아무거나 넣으면 axios를 실행하지도 않는 이슈
        axios.get('/api/user/passwordChange/' + key)
            .then(res => {
                if (res.data.success == true) {
                    setEmail(res.data.message);
                    console.log(res.data.message);
                    alert('인증되었습니다. 비밀번호를 변경해주세요.');
                }
                else {
                    alert('비정상적인 접근입니다.');
                    navigate('/login');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const onhandlePost = async (password, rePassword) => {

        if (!email) return alert('비정상적인 접근입니다.');

        await axios
            .post('/api/auth/signup', {
                email: email,
                password: password,
                rePassword: rePassword
            })
            .then(function (response) {
                console.log(response.status, '성공');

                navigate('/login');



            })
            .catch(function (err) {
                console.log(err);
                console.log(email);
                console.log(err.response.data.message);
                if (err.response.status === 400) {
                    alert(err.response.data.message);
                }


            });
    };
    // useState 추가

    // form 전송
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        let password = data.get('password');
        let rePassword = data.get('rePassword');

        // 비밀번호 유효성 체크
        const passwordRegex = /^.{4,20}$/;
        if (!passwordRegex.test(password)) {
            setPasswordState('4~20글자를 입력해주세요!');
        } else {
            setPasswordState('');
        }

        // 비밀번호 같은지 체크
        if (password !== rePassword) {
            setPasswordError('비밀번호가 일치하지 않습니다!');
        } else {
            setPasswordError('');
        }





        if (
            passwordRegex.test(password) &&
            password === rePassword

        ) {
            onhandlePost(password, rePassword);
        }

    };



    return (

        <Container component="main" maxWidth="xs">

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '10px',
                    padding: '32px',
                    backgroundColor: '#fff',
                    boxShadow: ' 0 8px 20px 0 rgba(0, 0, 0, 0.15)'
                }}
            >

                <Typography component="h1" variant="h5">
                    비밀번호 변경
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <FormControl component="fieldset" variant="standard">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="password"
                                    name="password"
                                    label="비밀번호 (4~20글자를 입력해주세요)"
                                    error={passwordState !== '' || false}
                                />
                            </Grid>
                            <FormHelperText>{passwordState}</FormHelperText>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="rePassword"
                                    name="rePassword"
                                    label="비밀번호 재입력"
                                    error={passwordError !== '' || false}
                                />
                            </Grid>
                            <FormHelperText>{passwordError}</FormHelperText>


                        </Grid>

                        <Button
                            id='joinBtn'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1 }}
                            size="large"
                        >
                            비밀번호 찾기
                        </Button>

                    </FormControl>

                </Box>
            </Box>
        </Container>

    );
};
export default Register;