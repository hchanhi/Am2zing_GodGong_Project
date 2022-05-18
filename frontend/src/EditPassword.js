
import React, { useState, useEffect } from 'react';
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

    const [passwordState, setPasswordState] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [email, setEmail] = useState([]);

    const [state, setsState] = useState();
    const navigate = useNavigate();


    const getUser = async () => {
        const json = await axios.get('/api/users/');
        console.log(json);
        setEmail(json.data);

        setsState(false);
    };
    useEffect(() => {
        getUser();
    }, [state == true]);


    const onhandlePost = async (data) => {
        const { email, password } = data;
        const postData = { email, password };

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


            });
    };
    // useState 추가

    // form 전송
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            email: data.get('email'),
            password: data.get('password'),
            rePassword: data.get('rePassword'),

        };
        const { email, password, rePassword } = joinData;


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
            email != null &&
            passwordRegex.test(password) &&
            password === rePassword

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
                    비밀번호 변경
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <FormControl component="fieldset" variant="standard">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    defaultValue={email.email}
                                    name="email"
                                    placeholder="이메일"
                                    type="text"
                                    readOnly
                                />
                            </Grid>

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