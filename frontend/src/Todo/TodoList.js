import React, { useState } from "react";
import DummyData from "./DummyData.js";
import TodoCard from "./TodoCard.js";

function TodoList() {

    let [dummys, setDummys] = useState(DummyData);

    let [nowPage, setNowPage] = useState(1);
    let LastIndex = nowPage * 3;
    let sliceTodoList = [];
    sliceTodoList = dummys.slice(0, LastIndex);

    return (
        <div>
            <h3>TODO study</h3>

            {
                sliceTodoList.map((dummy) => {
                    return <TodoCard dummy={dummy} key={dummy.id} />
                })
            }

            {
                LastIndex >= (dummys && dummys.length)
                    ? null
                    : <button onClick={() => setNowPage(++nowPage)}>▼ 더보기</button>
            }
        </div>
    );
}

export default TodoList;