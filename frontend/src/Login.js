import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



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

    const [checked, setChecked] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [nickName, setNickName] = useState();
    const [test, setTest] = useState(null);
    const navigate = useNavigate();

    // 동의 체크


    const onhandlePost = async (data) => {
        const { email, password } = data;
        const postData = { email, password };
        const headers = {
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,application/json, text/plain, */*"
            }

        };

        // post

        await axios
            .post('/api/auth/signin', postData)
            .then(function (response) {
                console.log(response.data, '성공');
                console.log(response.data.sub, '성공');
                localStorage.setItem('accessToken', JSON.stringify(response.data));
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data;

                if (response.status === 200) {
                    alert('로그인 되었습니다');
                    navigate('/');
                }



            })
            .catch(function (err) {
                console.log(err);
                alert("이메일 혹은 비밀번호가 틀렸습니다.");


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
        if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
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
                    alignItems: 'center',
                    borderRadius: '10px',
                    padding: '32px',
                    backgroundColor: '#fff',
                    boxShadow: ' 0 8px 20px 0 rgba(0, 0, 0, 0.15)'
                }}
            >

                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <FormHelperText>{emailError}</FormHelperText>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        로그인
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>

                    </Grid>
                    <Grid item>
                        <Link href="/join" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>

    );
};

export default Resigter;

