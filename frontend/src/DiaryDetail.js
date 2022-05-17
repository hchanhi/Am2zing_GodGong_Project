
import { useState, useEffect, useContext } from "react";
import { isAuth, getNickName } from './jwtCheck';
import axios from 'axios';


import { useNavigate, useParams } from "react-router-dom";
import {

    Box,
    Container,


} from '@mui/material/';
import './diary.css';



const DiaryDetail = () => {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickName = getNickName(token);
    const { id } = useParams();

    console.log(id);

    let today = new Date();


    const [diaries, setDiaries] = useState();
    const [date, setDate] = useState();

    const edit = diaries;
    const getDiaries = async () => {
        const json = await axios.get('/api/diary/edit/' + id, { params: { diaryId: id } });
        setDiaries(json.data.diaryContent);
        setDate(json.data.diaryCreated);
        console.log(json.data);


    };
    useEffect(() => {
        getDiaries();
        if (!isAuth(token)) {
            alert('로그인 후 이용하실 수 있어요😥');
            return navigate('/login');
        }
    }, []);


    const navigate = useNavigate();
    let dateEdit = "" + date;
    let body = {
        diaryId: id,
        content: edit

    };
    console.log(edit);

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

                console.log(origin);



            });



    };

    return (
        <Container className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <Box component="form" sx={{ mt: 3 }}>
                <div>
                    <input
                        value={nickName}

                        name="nickName"
                        placeholder="작성자"
                        type="text"
                        readOnly

                    />
                </div>
                <div>
                    <input
                        value={dateEdit.substring(0, 10)}

                        name="date"
                        placeholder="날짜"
                        type="text"
                        readOnly
                    />
                </div>
                <div>
                    <textarea
                        defaultValue={edit}
                        onChange={event => setDiaries(event.target.value)}
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
export default DiaryDetail;
