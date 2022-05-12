import { useRef, useState } from "react";

import styled from "styled-components";
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
const Diary = () => {
    const authorInput = useRef();
    const contentInput = useRef();

    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1
    });

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (state.author.length < 1) {
            authorInput.current.focus();
            return;
        }

        if (state.content.length < 5) {
            contentInput.current.focus();
            return;
        }

        console.log(state);
        alert("저장 성공!");
    };

    return (
        <Container className="DiaryEditor" component="main" maxWidth="xs">

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
                    오늘의 일기
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid> <input
                        value={state.author}
                        onChange={handleChangeState}
                        name="author"
                        placeholder="작성자"
                        type="text"
                    /></Grid>
                    <Grid>  <textarea
                        value={state.content}
                        onChange={handleChangeState}
                        name="content"
                        placeholder="일기"
                        type="text"
                    /></Grid>



                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        일기 저장하기
                    </Button>



                </Box>
            </Box>

        </Container>
    );
};
export default Diary;
