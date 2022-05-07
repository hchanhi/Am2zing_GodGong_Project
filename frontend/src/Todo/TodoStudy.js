import React from "react";
import { useParams } from "react-router-dom";

function TodoStudy() {

    let { id } = useParams();
    // 새로고침으로 인한 state 초기화를 대비하기 위해 Ajax 다시 실행

    return (
        <div>
            <h3>스터디방 id : {id}</h3>
            스터디만들기 모달창은 라이브러리 쓰지 않고 직접 구현하기<br />
        </div>
    );
}

export default TodoStudy;