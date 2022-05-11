import React from "react";
import styled from "styled-components";

let Receive = styled.div`
    height: 85vh;
    width: 100%
`
let Send = styled.div`
    height: 15vh;
    padding: 0.5rem;
    border-top: 1px solid lightgray;
`
let Text = styled.textarea`
    width: 100%;
    height: 80%;
    margin-top: 3px;
    padding: 10px;
    background-color: #e9e7e7;
    border: none;
    outline: none;
    font-family: 'Pretendard-Medium';
    font-size: 11pt;
`

function Chatting() {

    return (
        <div>
            <Receive></Receive>
            <Send>
                <div>닉네임</div>
                <Text></Text>
            </Send>
        </div>
    );
}

export default Chatting;