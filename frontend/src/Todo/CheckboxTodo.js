import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

let data = ['멋지게 밥먹기', '끝내주게 숨쉬기', '알람끄고 잘자기', '코딩하기...'];

let FireNav = styled(List)({
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginLeft: 10,
    }
});

function CheckboxTodo() {

    let [checked, setChecked] = useState([1]);

    let handleToggle = (value) => () => {
        let currentIndex = checked.indexOf(value);
        let newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <ThemeProvider
                theme={createTheme({
                    palette: { mode: 'dark', background: { paper: 'rgb(5, 51, 52)' }, }
                })}
            >
                <Paper elevation={0} sx={{ maxWidth: 256 }}>
                    <FireNav component="nav" disablePadding>
                        <ListItemButton sx={{ pt: 2, pb: 2, }}>
                            <ListItemText
                                primary="닉네임의 Todos"
                                primaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    letterSpacing: 1,
                                    lineHeight: '20px',
                                }}
                            />
                            <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                        </ListItemButton>
                        <Divider />
                        <Box sx={{ bgcolor: 'rgba(114, 143, 143, 0.2)', }}>
                            {data.map((value) => (
                                <ListItem
                                    key={value}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            onChange={handleToggle(value)}
                                            checked={checked.indexOf(value) !== -1}
                                        />
                                    }
                                    disablePadding
                                >
                                    <ListItemButton
                                        alignItems="flex-start"
                                        key={value}
                                        sx={{
                                            px: 3,
                                            pt: 2,
                                            pb: 2,
                                            minHeight: 32
                                        }}
                                    >

                                        <ListItemText
                                            primary={value}
                                            primaryTypographyProps={{
                                                fontSize: 15,
                                                fontWeight: 'medium',
                                                lineHeight: '10px',
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </Box>
                        <h4 style={{ padding: '1rem' }}>현재 진행 중 ... (50%)</h4>
                    </FireNav>
                </Paper>
            </ThemeProvider>
        </Box>
    );
}


export default CheckboxTodo;
