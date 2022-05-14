
import React, { useState } from 'react';
import axios from 'axios';

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
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [checked, setChecked] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [birthError, setBirthError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    // 동의 체크
    const handleAgree = (event) => {
        setChecked(event.target.checked);
    };



    const onhandlePost = async (data) => {
        const { birth, nickname, email, password } = data;
        const postData = { birth, nickname, email, password };

        // post

        await axios
            .post('/api/auth/signup', postData)
            .then(function (response) {
                console.log(response.status, '성공');

                navigate('/login');



            })
            .catch(function (err) {
                console.log(err);
                console.log(postData);
                console.log(origin);
                console.log(err.response.data.message);
                if (err.response.status === 400) {
                    alert(err.response.data.message);
                }
                setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');

            });
    };
    // useState 추가

    // form 전송
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            birth: data.get('birth'),
            nickname: data.get('nickname'),
            email: data.get('email'),

            password: data.get('password'),
            rePassword: data.get('rePassword'),

        };
        const { email, nickname, password, rePassword, birth } = joinData;

        // 이메일 유효성 체크
        // 이메일 유효성 체크
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
        else setEmailError('');

        // 비밀번호 유효성 체크
        const passwordRegex = /^.{4,20}$/;
        if (!passwordRegex.test(password)) {
            setPasswordState('4~20글자를 입력해주세요!');
        } else {
            setPasswordState('');
        }

        // 비밀번호 같은지 체크
        if (password !== rePassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }

        // 이름 유효성 검사
        const nameRegex = /^[가-힣|a-zA-Z|0-9]+$/;
        if (!nameRegex.test(nickname) || nickname.length < 1) {
            setNameError('올바른 이름을 입력해주세요.');
        } else {
            setNameError('');
        }
        // 이름 유효성 검사
        const birthRegex = /^[0-9]{6}$/;
        if (!birthRegex.test(birth)) {
            setBirthError('생년월일을 6자리로 입력해주세요.');
        } else {
            setBirthError('');
        }


        // 회원가입 동의 체크
        if (!checked) alert('회원가입 약관에 동의해주세요.');
        if (
            emailRegex.test(email) &&
            passwordRegex.test(password) &&
            password === rePassword &&
            nameRegex.test(nickname) &&
            birthRegex.test(birth) &&
            checked
        ) {
            onhandlePost(joinData);
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
                    회원가입
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <FormControl component="fieldset" variant="standard">
                        <Grid container spacing={2}>

                            <Grid item xs={12} >
                                <TextField
                                    required
                                    autoFocus
                                    fullWidth
                                    type="email"
                                    id="email"
                                    name="email"
                                    label="이메일 주소"
                                    error={emailError !== '' || false}
                                />
                            </Grid>
                            <FormHelperText>{emailError}</FormHelperText>


                            <Grid item xs={12} >
                                <TextField required fullWidth id="nickname" name="nickname" label="닉네임"
                                    error={nameError !== '' || false} />
                            </Grid>
                            <FormHelperText>{nameError}</FormHelperText>

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
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="text"
                                    id="birth"
                                    name="birth"
                                    label="생년월일(6자리)"
                                    error={birthError !== '' || false}
                                />
                            </Grid>
                            <FormHelperText>{birthError}</FormHelperText>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleAgree} color="primary" />}
                                    label="회원가입 약관에 동의합니다."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                        >
                            회원가입
                        </Button>
                    </FormControl>
                    <FormHelperText>{registerError}</FormHelperText>
                </Box>
            </Box>
        </Container>

    );
};
export default Register;