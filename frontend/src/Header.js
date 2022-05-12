import React from 'react';
import { Link } from "react-router-dom";

function Header(props) {

    const nickName = props.userNickName;

    return (
        <header>
            <Link to="/">
                <h1>GODGONG</h1>
            </Link>

            {
                nickName
                    ? (<div>
                        <Link to="/">
                            <span
                                onClick={() => {
                                    localStorage.clear();
                                    props.setUserNickName('');
                                }}
                            >
                                로그아웃
                            </span>
                        </Link>
                        <Link to="/mypage">
                            {nickName}님(누르면 마이페이지)
                        </Link>
                    </div>)
                    : (<div>
                        <Link to="/login">
                            로그인
                        </Link>
                        <span>|</span>
                        <Link to="/Join">
                            회원가입
                        </Link>
                    </div>)
            }
        </header>
    );
}

export default Header;

