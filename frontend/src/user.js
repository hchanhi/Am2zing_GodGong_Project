
import { useState, useEffect, useContext, useCallback } from "react";
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
    const userId = getId(token);
    const navigate = useNavigate();



    const [user, setUser] = useState([]);
    const [nic, setNick] = useState();
    const [birth, setBirth] = useState();
    const [state, setsState] = useState();
    const [oldPas, setOldPas] = useState();
    const [newPas, setNewPas] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState('');

    //오류메시지 상태저장
    const [nameMessage, setNameMessage] = useState('');
    const [birthMessage, setBirthMessage] = useState('');
    const [passwordOldMessage, setPasswordOldMessage] = useState('');
    const [passwordNewMessage, setPasswordNewMessage] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

    // 유효성 검사
    const [isName, setIsName] = useState(true);
    const [isBirth, setIsBirth] = useState(true);
    const [isOldPassword, setIsOldPassword] = useState(false);
    const [isNewPassword, setIsNewPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);


    const getDiaries = async () => {
        const json = await axios.get('/api/users/' + userId, { params: { id: userId } });
        console.log(json);
        setUser(json.data);
        setNick(json.data.nickname);
        setBirth(json.data.birth);

        console.log(user);
        setsState(false);
    };
    useEffect(() => {
        getDiaries();
        if (!isAuth(token)) {
            alert('로그인 후 이용하실 수 있어요😥');
            return navigate('/login');
        }
    }, [state == true]);
    let nicBody = {
        id: userId,
        nickname: nic

    };

    const handleSubmitNic = (e) => {
        const nameRegex = /^[가-힣|a-zA-Z|0-9]+$/;

        if (!nameRegex.test(nic) || nic.length < 1) {
            e.preventDefault();
            setNameMessage('올바른 닉네임을 입력해주세요!');
            setIsName(false);
        } else {
            setIsName(true);
            axios

                .post('/api/user/' + userId + '/nickname', nicBody)

                .then(function (response) {
                    console.log(response.status, '성공');

                    navigate('/');
                    console.log(response);
                    alert("수정 완료!");

                })
                .catch(function (err) {
                    console.log(err);
                    console.log(origin);

                });

        }



    };
    let birthBody = {
        id: userId,
        birth: birth

    };
    const handleSubmitBirth = () => {
        const birthRegex = /^[0-9]{6}$/;
        if (!birthRegex.test(birth)) {
            setBirthMessage('생년월일을 6자리로 입력해주세요!');
            setIsBirth(false);
        } else {
            setIsBirth(true);
            axios
                .post('/api/user/' + userId + '/birth', birthBody)
                .then(function (response) {
                    console.log(response.status, '성공');

                    navigate('/');
                    console.log(response);
                    alert("수정 완료!");

                })
                .catch(function (err) {
                    console.log(err);
                    console.log(origin);

                });

        }




    };
    let pasBody = {
        id: userId,
        oldPassword: oldPas,
        newPassword: newPas

    };
    const handleSubmitPas = useCallback(() => {
        const passwordRegex = /^.{4,20}$/;
        if (!passwordRegex.test(oldPas)) {
            setPasswordOldMessage('4~20글자를 입력해주세요!');
            setIsOldPassword(false);

        } else if (!passwordRegex.test(newPas)) {
            setPasswordNewMessage('4~20글자를 입력해주세요!');
            setIsOldPassword(true);
            setIsNewPassword(false);
        } else if (passwordConfirm != newPas) {
            setIsPasswordConfirm(false);
            setPasswordConfirmMessage('비밀번호가 다릅니다!');
            setIsOldPassword(true);
            setIsNewPassword(true);
        } else {
            setIsOldPassword(true);
            setIsNewPassword(true);
            setIsPasswordConfirm(true);
            axios
                .post('/api/user/' + userId + '/password', pasBody)
                .then(function (response) {
                    if (response.data == false) {
                        alert("비밀번호 오류!");
                    } else {
                        console.log(response.status, '성공');

                        navigate('/');
                        console.log(response);
                        alert("수정 완료!");
                    }


                })
                .catch(function (err) {
                    console.log(err);
                    console.log(origin);

                });

        }



    }, [oldPas, newPas, passwordConfirm]
    );

    let delBody = {
        id: userId,


    };
    const handleSubmitDel = () => {
        if (window.confirm("정말 탈퇴하시겠습니까 ?") == true) {
            axios
                .get('/api/user/' + userId + '/delete', delBody)
                .then(function (response) {
                    console.log(response.status, '성공');

                    navigate('/');
                    console.log(response);


                })
                .catch(function (err) {
                    console.log(err);
                    console.log(origin);

                });
            alert("탈퇴되었습니다");
        }
        else {
            return;
        }

    };
    // 닉네임
    const onChangeName = useCallback((e) => {
        const nameRegex = /^[가-힣|a-zA-Z|0-9]+$/;
        const nameCurrent = e.target.value;
        setNick(nameCurrent);

        if (!nameRegex.test(nameCurrent) || nameCurrent.length < 1) {
            setNameMessage('올바른 닉네임을 입력해주세요!');
            setIsName(false);
        } else {

            setIsName(true);
        }
    }, []);
    // 생년월일
    const onChangeBirth = useCallback((e) => {
        const birthRegex = /^[0-9]{6}$/;
        const birthCurrent = e.target.value;
        setBirth(birthCurrent);

        if (!birthRegex.test(birthCurrent)) {
            setBirthMessage('생년월일을 6자리로 입력해주세요!');
            setIsBirth(false);
        } else {

            setIsBirth(true);
        }
    }, []);
    // 현재 비밀번호
    const onChangeOldPassword = useCallback((e) => {
        const passwordRegex = /^.{4,20}$/;
        const passwordOldCurrent = e.target.value;
        setOldPas(passwordOldCurrent);

        if (!passwordRegex.test(passwordOldCurrent)) {
            setPasswordOldMessage('4~20글자를 입력해주세요!');
            setIsOldPassword(false);
        } else {

            setIsOldPassword(true);
        }
    }, []);
    // 변경 비밀번호
    const onChangeNewPassword = useCallback((e) => {
        const passwordRegex = /^.{4,20}$/;
        const passwordNewCurrent = e.target.value;
        setNewPas(passwordNewCurrent);

        if (!passwordRegex.test(passwordNewCurrent)) {
            setPasswordNewMessage('4~20글자를 입력해주세요!');
            setIsNewPassword(false);
        } else {

            setIsNewPassword(true);
        }
    }, []);
    //비번 확인
    const onChangePasswordConfirm = useCallback(
        (e) => {
            const passwordConfirmCurrent = e.target.value;
            setPasswordConfirm(passwordConfirmCurrent);

            if (newPas === passwordConfirmCurrent) {

                setIsPasswordConfirm(true);
            } else {
                setPasswordConfirmMessage('비밀번호가 다릅니다!');
                setIsPasswordConfirm(false);
            }
        },
        [newPas]
    );
    console.log(user.nickname);
    return (
        <Container className="DiaryEditor">
            <h3>{getNickName(token)}님의 마이페이지💁🏻‍♀️</h3>
            <h2>회원정보</h2>
            <Box component="form" sx={{ mt: 3 }}>
                <div>
                    <label>이메일</label>
                    <input
                        defaultValue={user.email}
                        name="nickName"
                        placeholder="작성자"
                        type="text"
                        readOnly

                    />

                </div>
                <div>
                    <label>닉네임</label>
                    <input
                        defaultValue={nic}
                        name="nickName"
                        onChange={onChangeName}
                        placeholder="닉네임"
                        type="text"


                    />
                    {<span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
                </div>
                <div>
                    <label>생년월일</label>
                    <input
                        defaultValue={birth}
                        name="birht"
                        onChange={onChangeBirth}
                        placeholder="생년월일"
                        type="text"


                    />
                    {<span className={`message ${isBirth ? 'success' : 'error'}`}>{birthMessage}</span>}
                </div>
                <div>
                    <label>현재 비밀번호</label>
                    <input
                        defaultValue={oldPas}
                        name="old"
                        onChange={onChangeOldPassword}
                        placeholder="현재 비밀번호"


                        type="password"



                    />
                    {(
                        <span className={`message ${isOldPassword ? 'success' : 'error'}`}>{passwordOldMessage}</span>
                    )}
                </div>
                <div>
                    <label>변경 비밀번호</label>
                    <input
                        defaultValue={newPas}
                        name="new"
                        onChange={onChangeNewPassword}
                        placeholder="변경 비밀번호"


                        type="password"



                    />
                    {(
                        <span className={`message ${isNewPassword ? 'success' : 'error'}`}>{passwordNewMessage}</span>
                    )}
                </div>
                <div>
                    <label>변경 비밀번호 확인</label>
                    <input
                        defaultValue={passwordConfirm}
                        onChange={onChangePasswordConfirm}
                        name="confirm"
                        placeholder="비밀번호 확인"
                        type="password"


                    />
                    {(
                        <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
                    )}
                </div>

            </Box>
            <div>
                <button onClick={handleSubmitNic}>닉네임 수정하기</button>
            </div>
            <div>
                <button onClick={handleSubmitBirth}>생년월일 수정하기</button>
            </div>
            <div>
                <button onClick={handleSubmitPas}>비밀번호 수정하기</button>
            </div>
            <div>
                <button onClick={handleSubmitDel}>탈퇴하기</button>
            </div>
        </Container>
    );

};
export default User;
