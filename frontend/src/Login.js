import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './join.css';
import {

    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Grid,
    Box,
    Typography,
    Container,
    Link,

} from '@mui/material/';
import Swal from 'sweetalert2';
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const Resigter = (props) => {


    const [emailError, setEmailError] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const navigate = useNavigate();

    // 동의 체크


    const onhandlePost = async (data) => {
        const { email, password } = data;
        const postData = { email, password };

        // post

        await axios
            .post('/api/auth/signin', postData)
            .then(function (response) {
                localStorage.setItem('accessToken', JSON.stringify(response.data));

                if (response.status === 200) {
                    Swal.fire({
                        confirmButtonColor: '#2fbe9f',

                        confirmButtonText: '확인',
                        text: '로그인 되었습니다!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            props.setIsLogin(!props.isLogin);
                            navigate('/');
                        }

                    });


                }
            })
            .catch(function (err) {
                console.log(err);
                Swal.fire({
                    confirmButtonColor: '#2fbe9f',

                    confirmButtonText: '확인',
                    text: '이메일 혹은 비밀번호가 틀렸습니다!', // Alert 제목 

                });

            });
    };

    // form 전송
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {

            email: data.get('email'),
            password: data.get('password'),


        };
        const { email, password } = joinData;

        // 이메일 유효성 체크
        // 이메일 유효성 체크
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다!');
        else setEmailError('');

        // 비밀번호 유효성 체크
        const passwordRegex = /^.{4,20}$/;
        if (!passwordRegex.test(password)) {
            setPasswordState('4~20글자를 입력해주세요!');
        } else {
            setPasswordState('');
        }




        // 회원가입 동의 체크

        if (
            emailRegex.test(email) &&
            passwordRegex.test(password)

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

                    borderRadius: '10px',
                    padding: '32px',
                    backgroundColor: '#fff',
                    boxShadow: ' 0 8px 20px 0 rgba(0, 0, 0, 0.15)'
                }}
            >

                <Typography component="h1" variant="h5" >
                    로그인
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="이메일"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={emailError !== '' || false}
                        />
                    </Grid>
                    <FormHelperText>{emailError}</FormHelperText>
                    <Grid item xs={16}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={passwordState !== '' || false}
                        />
                    </Grid>
                    <FormHelperText>{passwordState}</FormHelperText>
                    <Button
                        id="joinBtn"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        로그인
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/findPassword" variant="body2">
                                비밀번호를 잊어버리셨나요?
                            </Link>
                        </Grid>

                    </Grid>
                    <Grid item>
                        <Link href="/join" variant="body2">
                            {"계정이 없으신가요? 회원가입"}
                        </Link>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>

    );
};

export default Resigter;

