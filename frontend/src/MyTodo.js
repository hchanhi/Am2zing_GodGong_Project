import React, { useState } from "react";
import MyTodoList from "./MyTodoList";
import MyTodoStudy from "./MyTodoStudy";
import styled from "styled-components";

let Wrapper = styled.div`
    margin: auto;
    margin-top: 2vh;
    margin-bottom: 2vh;
    span {
        margin: auto;
        padding: 15vh 0;
        font-size: 20pt;
        color: grey;
    }
    width: ${props => props.isHome ? '0' : '65vw'}
`

function MyTodo() {

    return (
        <Wrapper>
            <MyTodoStudy />
            <MyTodoList />
        </Wrapper>
    );
}

export default MyTodo;