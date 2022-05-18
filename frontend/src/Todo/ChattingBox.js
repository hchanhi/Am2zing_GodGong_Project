import React, { useState, useEffect } from "react";
import Badge from '@mui/material/Badge';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import IconButton from '@mui/material/IconButton';
import { Box, SwipeableDrawer } from '@mui/material/';
import Chatting from "./Chatting";


function ChattingBox(props) {

    let [open, setOpen] = useState(false);
    let [badgeNum, setBadgeNum] = useState(props.messageNum);
    // 채팅창 보고 나온 뒤 못보는 채팅은 다시 0부터 카운트해야되니까
    // let [badgeNum, setBadgeNum] = useState(0);

    useEffect(() => {
        setBadgeNum(props.messageNum);
        // setBadgeNum(badgeNum++);
    }, [props.messageNum])

    let toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        if (open == false) {
            // setBadgeNum(0); //close될 때 props.meesageNum 0으로 초기화
        }
        setOpen(open);
    };

    return (
        <div>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <Badge badgeContent={badgeNum} color="error">
                    <ChatBubbleIcon sx={{ fontSize: 50 }} />
                </Badge>
            </IconButton>
            <SwipeableDrawer
                anchor='right'
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <Box sx={{ width: 350 }}>
                    <Chatting change={props.messageNum}/>
                </Box>
            </SwipeableDrawer>
        </div>
    );
}

export default ChattingBox;