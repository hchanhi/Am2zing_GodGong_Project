import React from "react";
import { Link } from "react-router-dom";

function Header() {

    return (
        <header>
            <Link to="/">
                <h1>GODGONG</h1>
            </Link>

            <Link to="/login">
                로그인
            </Link>
            <span>|</span>
            <Link to="/signin">
                회원가입
            </Link>
            <br />
            로그인하는 경우 로그아웃 + 사람모양 아이콘
        </header>
    );
}

export default Header;

