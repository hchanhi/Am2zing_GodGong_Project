import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {

    let navigate = useNavigate();

    return (
        <div>
            <h3>HOME</h3>
            오늘공부시간 <br />
            <button onClick={() => navigate("/challenge")}>챌린지</button> <br />
            지난 공부일기 <br />
            일별, 월별 공부시간 랭킹 <br />
            TODO 리스트 상위(최신순?) 8개 <br />

            <Link to="/todoList" style={{textDecoration: 'underline'}}>
                더보기
            </Link>
        </div>
    );
}

export default Home;