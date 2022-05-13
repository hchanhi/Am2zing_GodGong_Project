import React from "react";
import styled from "styled-components";

let Wrapper = styled.div`
    height: 20vh;
    padding: 3rem 5rem;
    background-color: lightgray;
    font-size: 10pt;
    color: gray;
    letter-spacing: 1px;
`
function Footer() {

    return (
        <Wrapper>
            <b>COMPANY | AGREEMENT | GUIDE | PRIVACY POLICY<br /><br /></b>
            COMPANY 같공 TEL 012-3456-7890 LUNCH BREAK 12:00~13:00 E-MAIL godgong @godgong.com<br/>
            BUSINESSNUMBER 000-00-00000 [사업자정보확인]<br />
            ADDERES 01234 서울특별시 강남구<br />
            Copyright © GODGONG. All rights reserved.
        </Wrapper>
    );
}

export default Footer;

