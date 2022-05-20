import React from "react";
import styled from "styled-components";

let Wrapper = styled.div`
  
`
function CompleteTodo({task}) {

    return (
        <Wrapper>
           {task}
        </Wrapper>
    );
}

export default CompleteTodo;