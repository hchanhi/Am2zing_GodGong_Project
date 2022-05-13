import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styled from "styled-components";
function DiaryList(props) {

    return (
        <div>
            <h3>{props.userNickName}님의 마이페이지💁🏻‍♀️</h3>

            <h2>공부일기 목록들입니다. 하단에 나올 예정입니다.</h2>


        </div>
    );
}
export default DiaryList;