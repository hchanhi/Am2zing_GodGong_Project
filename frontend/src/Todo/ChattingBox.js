import React, { useState } from "react";
import Badge from '@mui/material/Badge';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import IconButton from '@mui/material/IconButton';
import { Box, SwipeableDrawer } from '@mui/material/';
import Chatting from "./Chatting";

function ChattingBox() {

    let [open, setOpen] = useState(false);

    let toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    return (
        <div>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <Badge badgeContent={3} color="error">
                    <ChatBubbleIcon sx={{ fontSize: 50 }} />
                </Badge>
            </IconButton>
            <SwipeableDrawer
                anchor='right'
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <Box
                    sx={{ width: 350 }}
                    // role="presentation"
                >
                    <Chatting />
                </Box>
            </SwipeableDrawer>
        </div>
    );
}

export default ChattingBox;